import argparse
import csv
import json

# parse des arguments
parser = argparse.ArgumentParser()
parser.add_argument("fichier_csv", help="fichier csv a entrer")
parser.add_argument("fichier_js", help="fichier js a entrer")
args = parser.parse_args()
print(args.fichier_js)

# traitement du fichier csv

with open(args.fichier_csv, newline='\n', encoding='latin-1') as csvfile:
    csv_reader = csv.DictReader(csvfile, delimiter=';')
    line_count = 0
    with open(args.fichier_js, 'w') as js:
        js.write('export default data = [\n')
        for row in csv_reader:
            capitale = row['CAPITALE']
            capitale = capitale.replace("\'", " ")
            pays = row['PAYS']
            pays = pays.replace("\'", " ")
            continent = row['CONTINENT']
            js.write('   {'+"\n")
            js.write("      state: \'"+pays+"\',\n")
            js.write("      capital: \'"+capitale+"\',\n")
            js.write("      continent: \'"+continent+"\',\n")
#            js.write("      image: require(\'../Helpers/capital_images/"+capital.lower()+".jpeg\')\n")
            js.write('   },'+"\n")
        js.write(']')



            


