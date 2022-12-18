function getExpense() {
  createTimeDrivenTriggers();
  createTimeDrivenTriggerWeeklyReport();
}

function sendForEmail() {
  var emailAddress = Session.getEffectiveUser().getEmail();
  var formUrl = FormApp.getActiveForm().getPublishedUrl();
  var template = HtmlService
    .createTemplateFromFile('sendEmail.html');
  template.url = formUrl;
  var message = template.evaluate().getContent();
  MailApp.sendEmail({
    to: emailAddress,
    subject: "Expense Tracker",
    htmlBody: message
  });
}

function createTimeDrivenTriggers() {
  ScriptApp.newTrigger('sendForEmail')
    .timeBased()
    .atHour(22)
    .everyDays(1)
    .create();
}
function getActiveFormId() {
  const id = FormApp.getActiveForm().getId();
  return id;
}

function getSumWeekly() {
  var sum = 0;
  var form = FormApp.openById(getActiveFormId());
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      var a = Number(itemResponse.getResponse());
      sum = sum + a;
    }
  }

function sendWeeklyReport() {
  var emailAddress = Session.getEffectiveUser().getEmail();
  var template = HtmlService
    .createTemplateFromFile('weeklyReport.html');
  template.url = getBarChart();
  var c = getSumWeekly();
  var sumtostring = c.toString();
  var res = "You have spend " + sumtostring + " this week";
  var message = template.evaluate().getContent();
  MailApp.sendEmail({
    to: emailAddress,
    subject: res,
    htmlBody: message
  });
}

function getBarChart() {
  var ss = SpreadsheetApp.create("WeekReport");
  var sheet = ss.getSheets()[0]
  var sid = getActiveFormId()
  var form = FormApp.openById(sid);
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      var a = Number(itemResponse.getResponse());
      var b = "Day " + i.toString();
      sheet.getRange(2 + i, 1).setValue(b);
      sheet.getRange(2 + i, 2).setValue(a);
    }
  }
  var dataSourceUrl = ss.getUrl();
  var chartBuilder = Charts.newBarChart()
    .setTitle('Weekly Expense')
    .setXAxisTitle('Days')
    .setYAxisTitle('Daily Expenses')
    .setDimensions(600, 500)
    .setLegendPosition(Charts.Position.BOTTOM)
    .setDataSourceUrl("https://docs.google.com/spreadsheets/d/1AKVNHVsqmCR9jSQLNiv7xTD7eqgpIvtQBYgfEks4Hxg/edit#gid=0")
    .build();

  var chart = chartBuilder.build();
  return dataSourceUrl;
}

function createTimeDrivenTriggerWeeklyReport() {
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(10)
    .create();
}



  return sum;
}
