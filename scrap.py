from bs4 import BeautifulSoup
import requests
#()
remove_list = ["#", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
page_count = 0
#soup = BeautifulSoup(requests.get("https://www.ea.com/en/games/ea-sports-fc/ratings").text, "html")
#div = soup.find_all("div",class_="Table_profileContent__Lna_E")
#print(div[0])
#text = []
#tmp = ""
#count = 0
def scrap_row(query, div):
    count = 0
    for e in div:
        #print(e)
        for char in e.text:
            if char in remove_list:
                count +=1
            else:
        #text.append(e.text[count:])
                #print(e.text[count:])
                query = query + e.text[count:] + " \n"     
                count = 0
                break
    return query
def scrap_names():
    page_count = 1
    max_page = 5
    query = ""
    while page_count <= max_page:
        soup = BeautifulSoup(requests.get("https://www.ea.com/en/games/ea-sports-fc/ratings" + "?page=" + str(page_count)).text, "html")
        div = soup.find_all("div",class_="Table_profileContent__Lna_E")
        query = query + scrap_row(query, div)
        page_count +=1
    with open("html.txt", "w") as htmlfile:
        htmlfile.write(query)
    
scrap_names()