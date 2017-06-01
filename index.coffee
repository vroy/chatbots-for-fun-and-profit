Botkit = require("botkit")
process = require("process")
_ = require("lodash")

controller = Botkit.slackbot({
  json_file_store: "/tmp/profit"
  })

bot = controller.spawn({
  token: process.env.SLACK_TOKEN
  })

bot.startRTM (err, bot, payload) ->
  if err
    throw new Error("Could not connect to Slack")

controller.hears [/^hello/i, /^hi/], ["direct_message", "direct_mention", "mention"],
  (bot, message) ->
    greeting = _.capitalize(message.match[0])

    # Use the Slack API to get information about this user.
    bot.api.users.info { user: message.user }, (err, response) ->
      if err
        return bot.reply(message, "#{greeting} yourself! :wave:")

      bot.reply(message, "#{greeting} #{response.user.profile.first_name}! :wave:")

buildFoodMakerConversation = (food) ->
  return (err, conversation) ->
    conversation.addQuestion "What? Make your #{food} yourself.", [
      {
        pattern: "sudo make me a (sandwich|soup)",
        callback: (response, convo) ->
          convo.say("Okay. :#{food}:")
          convo.next()
      }
      {
        default: true,
        callback: (response, convo) ->
          convo.next("stop")
      }
    ]

controller.hears /^make me a (sandwich|soup)/, ["direct_message"],
  (bot, message) ->
    food = message.match[1]
    handler = buildFoodMakerConversation(food)

    if food == "sandwich"
      bot.startConversation(message, handler)
    else
      bot.startConversationInThread(message, handler)

controller.hears /^clear$/, ["direct_message", "direct_mention", "mention"],
  (bot, message) ->
    bot.reply(message, ".\n".repeat(40))
