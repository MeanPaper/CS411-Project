/** 
 * this is test object, it is used
 * to simulate the json object that
 * is requested from the database.
 * The frontend would first fetch the
 * data from database, json conversion 
 * tools to clean up as well as process
 * the data
*/

export default{
    "success": true,
    "course":[
        {
            "crn": 1,
            "title": 'Intro to Database',
            "department": 'CS',
            "course_num": 411,
            "instructors": ["Abdu Aliwini"]
        },
        {
            "crn": 2,
            "title": 'Computer System Engineering',
            "department": 'ECE',
            "course_num": 391,
            "instructors": ["Steven Lumetta", "Zibigniew Kalbarczyk"]
        },
        {   
            "crn": 3,
            "title": 'Data Structure',
            "department": 'CS',
            "course_num": 225,
            "instructors": ["Carl Evans"]
        },
        {
            "crn": 5,
            "title": 'System Programming',
            "department": 'ECE',
            "course_num": 220,
            "instructors": ["Yuting Chen", "Yih-Chun Hu"]
        }
    ]
}