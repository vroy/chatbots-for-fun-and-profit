# Chatbots for Fun and Profit

This is the source for the demo that I used for my Chatbots for Fun and Profit talk at [Maritime DevCon 2017](https://maritimedevcon.ca/). I also added the slides [here](Chatbots-for-Fun-and-Profit.pdf) for reference.

## Getting Started

1) Make sure you have node/npm installed.

2) Clone this repository and install the dependencies:

```
git clone https://github.com/vroy/chatbots-for-fun-and-profit.git
cd chatbots-for-fun-and-profit
npm install
```

3) Follow the [Slack documentation](https://api.slack.com/bot-users) on creating bot users.

4) Copy the token and start the application:

```
env SLACK_TOKEN=<token-copied-from-your-bot-user> node_modules/coffeescript/bin/coffee index.coffee
```

5) Profit.
