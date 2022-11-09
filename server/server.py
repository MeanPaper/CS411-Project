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
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    mycursor = mydb.cursor()
    check = "Select * FROM Users WHERE email = %s"
    checkres = mycursor.fetchall()
    if (len(checkres) > 1):
        return render_template("xxx.html", error = "The email is already registered")

    mycursor.execute(check, data["email"])
    
    query1 = "INSERT INTO Users (email, password) VALUES (%s, %s)"
    mycursor.execute(query1, (data["email"], data["password"]))
    mydb.commit()
    mycursor.close()
    return render_template("xxx.html")

# 2. Search the database using a keyword search.
@app.route('/search_course', methods=['GET'])
def search_course():
    data = request.get_json()
    mycursor = mydb.cursor()
    #instructor, subject, cNumber, courseName, schedType, A_rate
    query = """
            SELECT insFirstName, insLastName, subject, cNumber, courseName, schedType, yearTerm, W.A_rate
            FROM NoTimeToData.Grades 
            NATURAL JOIN ( SELECT yearTerm, subject, cNumber, (sum(aPlus)+sum(a))/(sum(aPlus)+sum(a)+sum(aMinus)+sum(bPlus)+sum(b)+sum(bMinus)+sum(cPlus)+sum(c)+sum(cMinus)+sum(dPLus)+sum(d)+sum(dMinus)+sum(f)+sum(w)) AS A_rate
					FROM NoTimeToData.Grades
                    Group by subject, cNumber, yearTerm
                    ) w
            WHERE subject=%s AND cNumber=%s
            """
    mycursor.execute(query, (data["subject"], data["cNumber"]))
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
    query = "DELETE FROM comments WHERE commentID = {data['comment_ID']};"
    mycursor.execute(query)
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

# 5. find_type_count
@app.route('/find_type_count', methods=['GET'])
def find_type_count():
    """
    Count how many Gened course are available each year
    """
    mycursor = mydb.cursor()
    query = """
        SELECT yearTerm, Count(*) as TypeCount
        FROM Courses c NATURAL JOIN Grades g
        WHERE %s != ''
        GROUP BY yearTerm;
    """
    mycursor.execute(query, data["course_type"])
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=False)
