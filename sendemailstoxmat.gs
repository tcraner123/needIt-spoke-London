function sendEmailsToxMatters() {
    var label = GmailApp.getUserLabelByName('send-to-xmatters');
    var messages = [];
    var threads = label.getThreads();

    for (var i = 0; i < threads.length; i++) {
        messages = messages.concat(threads[i].getMessages())
    }

    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        Logger.log(message);

        var payload = {
            "from" : message.getFrom(),
            "to" : message.getTo(),
            "cc" : message.getCc(),
            "date" : message.getDate(),
            "subject" : message.getSubject(),
            "txtbody" : message.getPlainBody()
        };

        var options = {
            'method' : 'post',
          'contentType' : 'application/json',
            'payload' : Utilities.jsonStringify(payload),
        };

        var webhookUrl = 'https://demo-tc.xmatters.com/api/integration/1/functions/0481cce3-d214-470e-91d3-6368a1566ad5/triggers?apiKey=9844b6af-3cc2-405c-bc41-ecdad5b422c5';
        UrlFetchApp.fetch(webhookUrl, options);
   }

   // remove the label from these threads so we don't send them to
   // slack again next time the script is run
   label.removeFromThreads(threads);
}
