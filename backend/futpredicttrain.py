import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import cross_val_score

def position_type(a):
    b = ["GK", "LB", "CB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "ST"]

    if a in b:
        return b.index(a)
    else:
        return None


def model_train():
# Read the data
    X_train = pd.read_csv('fifaRatings.csv')

    X_train["Position"] = X_train["Position"].apply(position_type)

    y = X_train.OverallRating
    X_train.drop(['OverallRating'], axis=1, inplace=True)
    X_train.drop("PlayerName", axis=1, inplace=True)


    X_train, X_valid, y_train, y_valid = train_test_split(X_train, y, train_size=0.8, test_size=0.2,
                                                                    random_state=0)

    my_model_2 = XGBRegressor(random_state=0,n_estimators = 450, learning_rate = 0.05) 

    my_model_2.fit(X_train, y_train) 

    predictions_2 = my_model_2.predict(X_valid) 

    mae_2 = mean_absolute_error(y_valid, predictions_2) 
    #print(mae_2)
    return my_model_2

def model_predict(data):
    X_test = pd.DataFrame({"PlayerName":data[0], "Position":data[1], "PaceRating":data[2],
                           "ShootRating":data[3], "PassRating":data[4], "DribRating":data[5],
                           "DefenseRating": data[6], "PhysicalRating":data[7]}, index=[0])

    model = model_train()

    X_test["Position"] = X_test["Position"].apply(position_type)
    #X_test.drop(["OverallRating"], axis=1, inplace=True)             
    X_test.drop("PlayerName", axis=1, inplace=True)

    preds_test = model.predict(X_test)

    return data[0] + ":" + str(round(preds_test[0]))

#print(model_predict(["Player Name","CB",99,99,78,85,76,99,88]))
#output = pd.DataFrame({'Id': X_test.index,
#                       'OverallRating': preds_test})
#output.to_csv('predictratingstest.csv', index=False)

