create function add_user_math_function(user_email character varying, math_function character varying) returns text
    language plpgsql
as
$$
DECLARE
    var_user_id INT;
    var_function_id INT;
BEGIN
    -- Step 1: Get the User ID by Email
    SELECT id INTO var_user_id
    FROM user_credentials
    WHERE email = user_email;

    -- Raise an exception if the email is not found
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User with email % does not exist', user_email;
    END IF;

    -- Step 2: Ensure the Math Function Exists or Create It
    INSERT INTO math_functions (function)
    VALUES (math_function)
    ON CONFLICT (function) DO NOTHING;

    -- Get the ID of the Math Function
    SELECT id INTO var_function_id
    FROM math_functions
    WHERE function = math_function;

    -- Step 3: Insert Into user_functions Table
    INSERT INTO user_functions (user_id, function_id)
    VALUES (var_user_id, var_function_id)
    ON CONFLICT (user_id, function_id) DO NOTHING;

    -- Return Success Message
    RETURN 'Math function successfully associated with user';
EXCEPTION
    WHEN OTHERS THEN
        -- Handle any unexpected errors
        RAISE NOTICE 'Error occurred: %', SQLERRM;
        RAISE;
END;
$$;

alter function add_user_math_function(varchar, varchar) owner to postgres;


