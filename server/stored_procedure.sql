DELIMITER $
CREATE PROCEDURE ARate()
BEGIN

    DECLARE varIFName CHAR(50);
    DECLARE varILName CHAR(50);
    DECLARE varSubject CHAR(10);
    DECLARE varNum INT;
    DECLARE varCName CHAR(255);
    DECLARE varType CHAR(10);
    DECLARE varYear CHAR(10);
	DECLARE varARate REAL;
	DECLARE varEval CHAR(50);
	DECLARE varCnt INT;
    DECLARE exit_loop BOOLEAN DEFAULT FALSE;
	DECLARE rateCur cursor FOR (SELECT insFirstName, insLastName, subject, cNumber, courseName, schedType, yearTerm, W.A_rate
            FROM NoTimeToData.Grades 
            NATURAL JOIN ( SELECT yearTerm, subject, cNumber, (sum(aPlus)+sum(a))/(sum(aPlus)+sum(a)+sum(aMinus)+sum(bPlus)+sum(b)+sum(bMinus)+sum(cPlus)+sum(c)+sum(cMinus)+sum(dPLus)+sum(d)+sum(dMinus)+sum(f)+sum(w)) AS A_rate
					FROM NoTimeToData.Grades
                    Group by subject, cNumber, yearTerm
                    )W );
                    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = 1; 
    
    DROP TABLE IF EXISTS RateTable;
    
    CREATE TABLE RateTable(
        insFirstName VARCHAR(50),
        insLastName VARCHAR(50),
        subject VARCHAR(10),
        cNumber INT,
        courseName VARCHAR(255),
        schedType VARCHAR(10),
        yearTerm VARCHAR(10),
        aRate REAL,
        varEval VARCHAR(50)
    );
	
    OPEN rateCur;
                
    cloop: LOOP
		FETCH rateCur INTO varIFName, varILName, varSubject, varNum, varCName, varType, varYear, varARate;
        IF (exit_loop) THEN
            LEAVE cloop;
        END IF;
		
        IF(varARate >= 0.8) THEN
            SET varEval = "Highly recommended";
        ELSEIF(varARate >= 0.4) THEN
            SET varEval = "Recommended";
        ELSE
            SET varEval = "Not recommended";
        END IF;
        
        SELECT count(*)
        INTO varCnt
        FROM Courses c JOIN Grades g ON (c.subject=g.subject AND c.cNumber=g.cNumber)
        WHERE (varSubject = c.subject and varNum= c.cNumber)
        GROUP BY c.subject, c.cNumber;
        
		IF(varCnt >= 1) THEN
        INSERT INTO RateTable VALUES(varIFName, varILName, varSubject, varNum, varCName, varType, varYear, varARate, varEval);
        END IF;
--         
    END LOOP cloop;
    CLOSE rateCur;
    SELECT * FROM RateTable;
END$
DELIMITER ;
-- call aRate;
-- DROP PROCEDURE aRate;