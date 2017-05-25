var Botkit = require("botkit");
var process = require("process");

var controller = Botkit.slackbot({
    stats_optout: true,
    json_file_store: "/tmp"
});

var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
});

bot.startRTM(function(err,bot,payload) {
    if (err) {
        throw new Error("Could not connect to Slack");
    }
});




controller.hears(
    [/^hello/i, /^hi/], ["direct_message", "direct_mention", "mention"],
    function(bot, message) {
        var greeting = message.match[0].charAt(0).toUpperCase() + message.match[0].slice(1);

        bot.api.users.info({ user: message.user }, function(err, response) {
            if (err) {
                return bot.reply(message, greeting + " yourself! :wave:");
            }

            bot.reply(message,
                      greeting + " " + response.user.profile.first_name + "! :wave:");
        });
    }
);






controller.hears(
    /^make me a (sandwich|soup)/, ["direct_message"],
    function(bot, message) {
        var food = message.match[1];

        var handler = function(err, conversation) {
            conversation.addQuestion("What? Make your " + food + " yourself.", [
                {
                    pattern: "sudo make me a (sandwich|soup)",
                    callback: function(response, convo) {
                        convo.say("Okay.");
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: function(response, convo) {
                        convo.next("stop");
                    }
                }
            ]);
        };

        if (food == "sandwich") {
            bot.startConversation(message, handler);
        }
        else {
            bot.startConversationInThread(message, handler);
        }
    }
);





controller.hears(
    /^clear$/,
    ["direct_message", "direct_mention", "mention"],
    function(bot, message) {
        bot.reply(message, ".\n".repeat(40));
    }
);
