from bs4 import BeautifulSoup
import requests
import pandas as pd
def scrap_names(query, div):
    remove_list = ["#", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '']
    count = 0
    for e in div:
        for char in e.text:
            if char in remove_list:
                count +=1
            else:
                query = query + e.text[count:] + " \n"     
                count = 0
                break
    query = query[:-2]      
    return query
def scrap_section():
    page_count = 1
    max_page = 175
    query = ""
    names_list = []
    pos_list = []
    stats_list = []
    ovr_list = []
    pace_list = []
    sho_list=[]
    pas_list=[]
    dri_list=[]
    def_list=[]
    phy_list=[]
    while page_count <= max_page:
        soup = BeautifulSoup(requests.get("https://www.ea.com/en/games/ea-sports-fc/ratings" + "?page=" + str(page_count)).text, "html")
        name_div = soup.find_all("div",class_="Table_profileContent__Lna_E")
        pos_div = soup.find_all("span", class_="Table_tag__FeM31 generated_utility20sm__KblNR generated_utility19md__EuZui")
        stat_div = soup.find_all("span", class_="Table_statCellValue__0G9QI")
        names_list=names_list + scrap_names(query, name_div).split(" \n")
        pos_list = scrap_pos(pos_list, pos_div)
        stats_list = scrap_stats(stats_list, stat_div)
        page_count +=1

    
    stats_count = 1
    stat_tmp = ""
    for stat in stats_list:
        stat_tmp = stat[:2]
        
        if stats_count == 1:
            ovr_list.append(int(stat_tmp))
        elif stats_count == 2:
            pace_list.append(int(stat_tmp))
        elif stats_count == 3:
            sho_list.append(int(stat_tmp))
        elif stats_count == 4:
            pas_list.append(int(stat_tmp))
        elif stats_count == 5:
            dri_list.append(int(stat_tmp))
        elif stats_count == 6:
            def_list.append(int(stat_tmp))
        elif stats_count == 7:
            phy_list.append(int(stat_tmp))
            stats_count = 0
            
        stats_count +=1

    #for i in range(10):
        #print(ovr_list[i], pace_list[i], sho_list[i], pas_list[i], dri_list[i], def_list[i], phy_list[i])

    #for i in range(len(names_list)):
        #print(names_list[i], pos_list[i], ovr_list[i], pace_list[i], sho_list[i], pas_list[i], dri_list[i], def_list[i], phy_list[i])
    
    output = pd.DataFrame({'PlayerName': names_list,'Position': pos_list, 'OverallRating': ovr_list, 'PaceRating': pace_list,
                            'ShootRating': sho_list, 'PassRating': pas_list, 'DribRating': dri_list, 'DefenseRating': def_list, 'PhysicalRating':phy_list})
    output.to_csv('fifaRatings.csv', index=False)
    
def scrap_stats(stats_list,div):
    stat_count = 1
    for e in div:
        if stat_count <= 7:
            stats_list.append(e.text)
        elif stat_count >= 8:
            if stat_count >= 14:
                stat_count = 0      
        stat_count +=1
    return stats_list

def scrap_pos(list, div):
    for e in div:
        list.append(e.text)
    return list
    
scrap_section()