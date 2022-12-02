import json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector
import random
import os
from dotenv import load_dotenv

# load_dotenv()
# host_=os.getenv('HOST')
# user_=os.getenv('USER')
# password_=os.getenv('PSW')
# database_=os.getenv('DB')
mydb = mysql.connector.connect(
    host='35.193.104.159',
    user='root',
    password='NoTimeToData22',
    database='NoTimeToData'
)


app = Flask(__name__)

CORS(app)

# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM Position")
# myresult = mycursor.fetchall()
# position_count = mycursor.rowcount
# mycursor.execute("SELECT * FROM Application")
# myresult = mycursor.fetchall()
# app_count = mycursor.rowcount
# mycursor.close()

@app.route('/prof')
def my_profile():
    return {"name": "Nagato"}

# 1. Insert new user into database
@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    print(data['email'])
    mycursor = mydb.cursor()
    # check = """Select email FROM NoTimeToData.Users WHERE email = %s"""
    # temp = (data['email'])
    # mycursor.execute(check, temp)
    # checkres = mycursor.fetchall()
    # if (len(checkres) > 1):
    #     return render_template("index.html", error = "The email is already registered")
    query = """DELETE FROM NoTimeToData.Users WHERE email = %s"""
    mycursor.execute(query, (data['email'],))
    mydb.commit()
    mycursor.close()
    return "Success", 200

@app.route('/update_password', methods=['PUT'])
def update_password():
    data = request.get_json()

    # print(data['email'])
    # print(data['password'])

    mycursor = mydb.cursor()
    check = "SELECT email FROM NoTimeToData.Users WHERE email = %s"
    mycursor.execute(check, (data["email"],))
    checkres = mycursor.fetchall()
    if(len(checkres) == 0):
        return "No User", 200 

    query = "UPDATE NoTimeToData.Users SET password = %s WHERE email = %s"
    mycursor.execute(query, (data["password"], data["email"]))
    mydb.commit()
    mycursor.close()
    return "Success", 200

# 0. Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    mycursor = mydb.cursor()
    check = """Select email FROM NoTimeToData.Users WHERE email = %s"""
    mycursor.execute(check, (data['email'],))
    checkres = mycursor.fetchall()
    if (len(checkres) == 0):
        return "User Not Exists", 200

    check = """Select password FROM NoTimeToData.Users WHERE email = %s"""
    mycursor.execute(check, (data['email'],))
    checkres = mycursor.fetchall()
    if (str(checkres)[3:-4] != str(data['password'])):
        print(str(checkres), str(data['password']))
        return "Wrong Password", 200
    mydb.commit()
    mycursor.close()
    return "Success", 200


# 1. Insert new user into database
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # print(data['email'])
    # print(data['password'])

    mycursor = mydb.cursor()
    check = """Select email FROM NoTimeToData.Users WHERE email = %s"""
    mycursor.execute(check, (data['email'],))
    checkres = mycursor.fetchall()
    if (len(checkres) >= 1):
        return "User Exists", 200

    query1 = """
            INSERT INTO NoTimeToData.Users(email, password) VALUES (%s, %s)
            """

    mycursor.execute(query1, (data['email'], data['password']))
    mydb.commit()
    mycursor.close()
    return "Success", 200


# 2. Search the database using a keyword search.
@app.route('/search_course', methods=['GET'])
def search_course():
    cNumber = request.args.get('cNumber')
    subject = request.args.get('subject')
    mycursor = mydb.cursor()
    #instructor, subject, cNumber, courseName, schedType, A_rate
    query = """
            SELECT insFirstName, insLastName, subject, cNumber, courseName, schedType, yearTerm, W.A_rate
            FROM NoTimeToData.Grades 
            NATURAL JOIN ( SELECT yearTerm, subject, cNumber, (sum(aPlus)+sum(a))/(sum(aPlus)+sum(a)+sum(aMinus)+sum(bPlus)+sum(b)+sum(bMinus)+sum(cPlus)+sum(c)+sum(cMinus)+sum(dPLus)+sum(d)+sum(dMinus)+sum(f)+sum(w)) AS A_rate
					FROM NoTimeToData.Grades
                    Group by subject, cNumber, yearTerm
                    ) W
            WHERE subject= %s AND cNumber= %s
            ORDER BY W.A_rate DESC
            """
    mycursor.execute(query, (subject, int(cNumber)))
    
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

@app.route('/search_online', methods=['GET'])
def search_online():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = """
            SELECT insFirstName, insLastName, subject, cNumber, courseName, schedType, yearTerm, W.A_rate
            FROM NoTimeToData.Grades 
            NATURAL JOIN ( SELECT yearTerm, subject, cNumber, (sum(aPlus)+sum(a))/(sum(aPlus)+sum(a)+sum(aMinus)+sum(bPlus)+sum(b)+sum(bMinus)+sum(cPlus)+sum(c)+sum(cMinus)+sum(dPLus)+sum(d)+sum(dMinus)+sum(f)+sum(w)) AS A_rate
					FROM NoTimeToData.Grades
                    Group by subject, cNumber, yearTerm
                    )
            WHERE schedType = "ONL" AND subject=%s AND cNumber=%s
            """
    mycursor.execute(query, (data["subject"], data["cNumber"]))

    
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

# 3.  Delete comments from the database
@app.route('/delete_comment', methods=['DELETE'])
def delete_comment():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = "DELETE FROM comments WHERE commentID = %s"
    mycursor.execute(query,(data['comment_ID']))
    mydb.commit()
    mycursor.close()
    return render_template("xxx.html")

# 4. Update comments to the db
@app.route('/update_comment', methods=['PUT'])
def update_user_info():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = "UPDATE Comments SET content = %s WHERE commentID = %s"
    mycursor.execute(query, (data["content"], data["comment_id"]))
    mydb.commit()
    mycursor.close()
    return render_template("xxx.html")

# 5. Insert comments to the db
@app.route('/insert_comment', methods=['PUT'])
def insert_comment():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = """
            INSERT INTO Comments (commentID,content,email,subject,cNumber,commentTime)
            VALUES (%s, %s, %s, %s, %s, NOW());
            """
    mycursor.execute(query, (data["commentID"], data["content"], data["email"], data["subject"], data["cNumber"]))
    mydb.commit()
    mycursor.close()
    return "Success", 200

# 6. Get comments to the db
@app.route('/get_comment', methods=['GET'])
def get_comment():
    cNumber = request.args.get('cNumber')
    subject = request.args.get('subject')
    mycursor = mydb.cursor()
    query = """
            SELECT content
            FROM Comments
            WHERE subject=%s AND cNumber=%s
            ORDER BY Comments.commentTime Desc
            """
    mycursor.execute(query, (subject, int(cNumber)))
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

# 7. find_type_count
@app.route('/find_type_count', methods=['GET'])
def find_type_count():
    # Count how many Gened course are available each year
    data = request.args.get('course_type')
    # print(data)
    mycursor = mydb.cursor()
    query = """
        SELECT yearTerm, Count(*) as TypeCount
        FROM Courses c NATURAL JOIN Grades g
        WHERE cs = %s
        GROUP BY yearTerm;
    """
    mycursor.execute(query, (data,))
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

#8. get recommend list:
@app.route('/get_recommend_list', methods=['GET'])
def get_recommend_list():
    mycursor = mydb.cursor()
    query = """
            SELECT * FROM RateTable
            """
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)



def call_sp():
    mycursor = mydb.cursor()
    mycursor.callproc('ARate')
    mydb.commit()
    # print(mycursor.stored_results())


    # for res in mycursor.stored_results(): 
    #     print(res.fetchall())

    # res = mycursor.fetchall()
    # print out the result
    mycursor.close()
    # print(jsonify(res))
    # return jsonify(res)



if __name__ == "__main__":
    # call_sp()
    app.run(host="127.0.0.1", port="5000", debug=False)
    
