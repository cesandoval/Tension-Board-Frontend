import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

cred = credentials.Certificate("tension-board-2b6c3-firebase-adminsdk-f1mob-e5e579957c.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'tension-board-2b6c3',
})

db = firestore.client()
print(db)

# Opening JSON file
f = open('tension_climbs.json')
  
# returns JSON object as 
# a dictionary
hold_dict = json.load(f)
for key, climb in hold_dict.items():
  db.collection('tension-climbs').document(key).set(climb)

