climb_placements = 'climb_placements.csv'


# importing csv module
import csv
import json
  
# Opening JSON file
f = open('tension_transalate_2.json')
  
# returns JSON object as 
# a dictionary
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
        # print(row)
        if row[0] not in output_json:
            output_json[row[0]] = {'colorData':{}}
        else:
            if 'name' not in output_json[row[0]]: 
                output_json[row[0]]['name'] = row[1]
            if tension_holds[row[2]] != '': output_json[row[0]]['colorData'][tension_holds[row[2]]] = colors[int(row[3])]

with open("tension_climbs.json", "w") as outfile:
    json.dump(output_json, outfile)

  
