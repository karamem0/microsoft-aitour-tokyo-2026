//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using Karamem0.MyToDoList.Models;
using Karamem0.MyToDoList.Services;
using Microsoft.Agents.Builder.App;
using Microsoft.Agents.Core.Models;

namespace Karamem0.MyToDoList;

public class ToDoAgent : AgentApplication
{

    public ToDoAgent(AgentApplicationOptions options, ICopilotServiceFactory copilotServiceFactory)
        : base(options)
    {
        _ = this.OnConversationUpdate(
            ConversationUpdateEvents.MembersAdded,
            async (
                turnContext,
                turnState,
                cancellationToken
            ) =>
            {
                var token = await this.UserAuthorization.ExchangeTurnTokenAsync(turnContext, cancellationToken: cancellationToken);
                var copilotService = copilotServiceFactory.Create(token);
                var conversationId = await copilotService
                    .CreateConversationAsync(cancellationToken)
                    .ContinueWith(value => value.Result.Id, cancellationToken);
                var conversationRequest = new CopilotConversationRequest()
                {
                    Message = new CopilotConversationRequestMessageParameter()
                    {
                        Text = """
                               あなたは「MyToDo Agent」という名前のメールの内容から TODO リストを作成するアシスタントです。
                               はじめに挨拶とあなたができることを簡単に説明してください。
                               その後、ユーザーからの入力を待ち、指示にしたがってその内容から TODO リストを作成してください。
                               フォローアップとして作成した TODO の内容を変更したり、期限を設定したりすることもできます。
                               # 指示例
                               - 先週の金曜日に送られたメールの内容から TODO リストを作成してください。
                               - 期限を3/31に延長してください。
                               # 出力結果
                               結果は以下のフォーマットで出力してください。
                               {"value": [{"id": "GUID", "name": "TODO の内容", "due": "TODO の期限 (ISO 8601 形式)"}]}
                               出力結果に JSON 以外のテキストを含めないでください。
                               期限が特定できない場合は 1 週間後を期限として設定し、期限を null にしないでください。
                               """
                    },
                    LocationHint = new CopilotConversationLocation()
                    {
                        TimeZone = "Asia/Tokyo"
                    }
                };
                var conversation = await copilotService.ChatCompletionAsync(
                    conversationId,
                    conversationRequest,
                    cancellationToken
                );
                turnState.Conversation.SetValue(nameof(CopilotConversation), conversation);
                var message = conversation.Messages?.Last();
                _ = await turnContext.SendActivityAsync(message?.Text ?? "MyToDo Agent へようこそ!", cancellationToken: cancellationToken);
            }
        );
        _ = this.OnActivity(
            ActivityTypes.Message,
            async (
                turnContext,
                turnState,
                cancellationToken
            ) =>
            {
                var token = await this.UserAuthorization.ExchangeTurnTokenAsync(turnContext, cancellationToken: cancellationToken);
                var copilotService = copilotServiceFactory.Create(token);
                var conversationId = turnState.Conversation.GetValue<CopilotConversation>(nameof(CopilotConversation))
                    .Id;
                if (conversationId is null)
                {
                    _ = await turnContext.SendActivityAsync($"会話 ID を取得できませんでした。", cancellationToken: cancellationToken);
                }
                else
                {
                    _ = await turnContext.SendActivityAsync(
                        new Activity()
                        {
                            Type = ActivityTypes.Message,
                            Text = "タスク リストの更新中です。しばらくお待ちください..."
                        },
                        cancellationToken
                    );
                    var conversationRequest = new CopilotConversationRequest()
                    {
                        Message = new CopilotConversationRequestMessageParameter()
                        {
                            Text = turnContext.Activity.Text
                        },
                        LocationHint = new CopilotConversationLocation()
                        {
                            TimeZone = "Asia/Tokyo"
                        }
                    };
                    var conversation = await copilotService.ChatCompletionAsync(
                        conversationId,
                        conversationRequest,
                        cancellationToken
                    );
                    var message = conversation.Messages?.Last();
                    turnState.Conversation.SetValue(nameof(CopilotConversation), conversation);
                    _ = await turnContext.SendActivityAsync(
                        new Activity()
                        {
                            Type = ActivityTypes.Message,
                            Text = "タスク リストを更新しました。"
                        },
                        cancellationToken
                    );
                    _ = await turnContext.SendActivityAsync(
                        new Activity()
                        {
                            Type = ActivityTypes.Event,
                            Name = "items",
                            Text = message?.Text ?? "{\"value\": []}"
                        },
                        cancellationToken
                    );
                }
            }
        );
        this.UserAuthorization.OnUserSignInFailure(async (
                turnContext,
                turnState,
                handlerName,
                response,
                activity,
                cancellationToken
            ) => _ = await turnContext.SendActivityAsync(
                $"サインインに失敗しました: {handlerName}: {response.Cause}/{response.Error!.Message}",
                cancellationToken: cancellationToken
            )
        );
    }

}
