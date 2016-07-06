# PAW_RailIndiaTweet (TweetIndia 2.0)
####TweetIndia 2.0 - URL : [TweetIndia 2.0](https://project-2808286444875271453.firebaseapp.com/)
A WebApp to populate various Indian Ministries official handles (Only Railway Ministry handles as of now) based on user selection.
####Demo
####Steps
1. Launch [TweetIndia 2.0](https://project-2808286444875271453.firebaseapp.com/)
2. Type "Rail" in Ministry textbox and Select "Ministry of Railways"
3. Select Zone and Division
4. Click "Tweet" button (It does NOT post the tweet) - Results in opening either Twitter App / Twitter Website Once reviewed, user has to post the tweet.

####Features:
1. From Mobile with Twitter App Installed : This site opens New Tweet window in Twitter App with user selected handles + contents.
2. From Mobile without Twitter App : This site opens New Tweet window in Twitter Web Page with user selected handles + contents.
3. Works Offline - Scenario :

   A Rail Passenger needs help / suggestion to RailMinistry now can use this site even if Offline. Populate contents and save it as a draft in Twitter App.

   Once reached station where Public WiFi is available - can post the tweet from Twitter App.
4. Once all static assets installed in browser cache - this site will show a ticker "Ready to Work Offline" at page bottom.

####Tech Stack:
1. Progressive Web App for enabling Offline + Launch from Desktop (Mobile) features.
2. Learnt we can launch Native Apps from Website (via Mobile) using "deep linking" concept.
3. Used Promises concept in Javascript to decide if contents from site needs to be landed in Twitter App or Twitter Website.
Not used Open Source libraries to accomplish point C. as they were using callbacks which is not safe and Didn't want to add one more third party js to the site.
