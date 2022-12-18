# ExpenseAddon
building an expense add-on using google form and sheet .


to use this add-on, create a google form to fill your daily expenses and it will be send to your email daily.

Steps to deploy add-on for the mentioned google form

1.select Script editor from the right menu bar.

2.select the deploy from upper right corner.

3.select new deployments from drop down menu.

4.configure the deployment to the given URL of Web app version and click the deploy button.


This web app have 8 functionalities:
1.getExpense()
-It calls two trigger functions.
-A trigger for generating google forms daily to fill the expense of the day.
-The other trigger is to generate weekly reports.

2.sendForEmail()
-This function sends the email including form to the user via gmail.

3.createTimeDrivenTriggers()
-It is the trigger to generate forms daily.

4.getActiveFormId()
-This is to get the id of active form.

5.getSumWeekly()
-To generate the weekly expense by summation of daily expenses for 7 days.

6.sendWeeklyReport()
-It is to send weekly report to the user and it will send a spreadsheet and some tips to the user.

7.createTimeDrivenTriggerWeeklyReport()
-To send weekly report once in a week.

8.getReport()
-This function generates the weekly report.









