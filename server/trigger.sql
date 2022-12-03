SET SQL_SAFE_UPDATES = 0;
DELIMITER $
CREATE TRIGGER InsTrigger 
	AFTER DELETE ON Users
		FOR EACH ROW
  BEGIN
    SET @x = (SELECT Count(*) FROM Comments c
            WHERE c.email = old.email
            AND EXISTS(SELECT *
					FROM Courses co
					WHERE co.cNumber=c.cNumber AND co.subject=c.subject
                    )
			GROUP BY c.email);
    IF @x > 0 THEN
        UPDATE Comments c
		SET email = "delete" 
        WHERE email=old.email AND EXISTS(SELECT *
					FROM Courses co
					WHERE co.cNumber=c.cNumber AND co.subject=c.subject
                    );
	END IF;
    DELETE FROM Comments c
        WHERE c.email=old.email AND CommentID IS NOT NULL;
 
  END$
DELIMITER ;