climb_placements = 'climb_placements.csv'


# importing csv module
import csv
import json
  
# Opening JSON file
with open('tension_transalate_2.json') as f:
    # returns JSON object as a dictionary
    hold_dict = json.load(f)

tension_holds = {}
for hold in hold_dict:
    try: hold_name = int(hold['hold'])
    except: hold_name = str(hold['hold']).replace(" ", "")
    tension_holds[str(hold['hold_id'])] = hold_name
# initializing the titles and rows list
colors = {1:'green',2:'blue',3:'red',4:'magenta'}

output_json = {}
# reading csv file
with open(climb_placements, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)
      
    # extracting field names through first row
    fields = next(csvreader)
  
    # extracting each data row one by one
    for row in csvreader:
        uuid, name, placement_id, role_id = row[0], row[1], row[2], row[3]

        # setdefault, not if/else: the old version put the first row of every
        # climb down a branch that recorded nothing, so each climb lost its
        # first placement (24566 of 34782 climbs were missing a hold).
        climb = output_json.setdefault(uuid, {'name': name, 'colorData': {}})

        hold = tension_holds[placement_id]
        if hold != '':
            climb['colorData'][hold] = colors[int(role_id)]

with open("tension_climbs.json", "w") as outfile:
    json.dump(output_json, outfile)

  
