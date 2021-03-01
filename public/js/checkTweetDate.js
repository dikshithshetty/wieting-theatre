function checkTweetDate( ) {
    var pubDate = Date.parse(document.getElementsByTagName('time')[0].getAttribute('datetime'));
    console.log("pubDate's value is: " + pubDate);    // returns a parsed date
    var TodaysDate = Date.parse(Date());
    document.getElementById("TodaysDate").innerHTML = TodaysDate;
    if (pubDate < TodaysDate) {
      alert("Stale");
    } else {
      alert("Current");
    }
}
