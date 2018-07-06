
# Marvel Demo

---


### Links

See the demo live:
- **Frontend** (GitHub Pages): http://lizaramo.com/marvel/
- **Backend** (Heroku): https://immense-basin-20540.herokuapp.com/


Find the code on Github:
- **Frontend:** https://github.com/LizaLemons/marvel
- **Backend:** https://github.com/LizaLemons/marvel-api


---


### Technology

**Backend:**
- Node
- Express
- Mongo DB


**Frontend:**
- JS
- HTML
- CSS


---


### How it works


**Marvel search functionality:**
- On the FE, the user searches for a Marvel character
- This data is sent to the backend
- The BE retrieves the hidden Marvel API keys & makes an AJAX call to the Marvel API
- The BE sends the response data to the FE
- The FE appends the data to the DOM


**Note:**
* Instead of making an ajax call directly to Marvel from our FE, we must send it to our BE first. The BE has the capability to retrieve our secret key, which it does before it makes the API call to Marvel with the user's search val.


**"Favoriting" functionality:**
- When the results are displayed, the user can choose to 'favorite' the character
- The FE sends the name & marvel ID of the character to the BE
- BE stores the "favorited" data in the DB

**"Unfavoriting" functionality:**
- When the user clicks the heart next to a character in the "favorites" list on the left, the FE captures the marvel ID of the character & sends this data to the BE.
- The BE then connects to Mongo, finds the character in the DB by its Marvel ID, & deletes it. 





---
