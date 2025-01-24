create table user_credentials
(
    id         serial
        primary key,
    email      varchar(255)                                           not null
        unique,
    password   varchar(255)                                           not null,
    created_at timestamp    default CURRENT_TIMESTAMP,
    updated_at timestamp    default CURRENT_TIMESTAMP,
    username   varchar(255) default 'default_user'::character varying not null
);

alter table user_credentials
    owner to postgres;

create table math_functions
(
    id         serial
        primary key,
    function   varchar(255) not null
        constraint unique_math_function
            unique,
    created_at timestamp default CURRENT_TIMESTAMP
);

alter table math_functions
    owner to postgres;

create table user_functions
(
    id          serial
        primary key,
    user_id     integer not null
        constraint fk_user
            references user_credentials
            on delete cascade,
    function_id integer not null
        constraint fk_function
            references math_functions
            on delete cascade,
    created_at  timestamp default CURRENT_TIMESTAMP,
    unique (user_id, function_id),
    constraint unique_user_function
        unique (user_id, function_id)
);

alter table user_functions
    owner to postgres;

create table algorithm
(
    id_algorithm serial
        primary key,
    algorithm    varchar(255) not null
        constraint unique_algorithm
            unique,
    created_at   timestamp default CURRENT_TIMESTAMP
);

alter table algorithm
    owner to postgres;

create table sorting_speed
(
    id_speed      serial
        primary key,
    sorting_speed varchar(255) not null
        constraint unique_speed
            unique,
    created_at    timestamp default CURRENT_TIMESTAMP
);

alter table sorting_speed
    owner to postgres;

create table user_sorting
(
    id           serial
        primary key,
    id_user      integer not null
        constraint fk_user
            references user_credentials
            on delete cascade,
    id_algorithm integer not null
        constraint fk_algorithm
            references algorithm
            on delete cascade,
    id_speed     integer not null
        constraint fk_speed
            references sorting_speed
            on delete cascade,
    created_at   timestamp default CURRENT_TIMESTAMP,
    constraint unique_user_algorithm_speed
        unique (id_user, id_algorithm, id_speed)
);

alter table user_sorting
    owner to postgres;

create table acceleration_values
(
    id         serial
        primary key,
    acc_value  varchar(255) not null
        constraint unique_acc_val
            unique,
    created_at timestamp default CURRENT_TIMESTAMP
);

alter table acceleration_values
    owner to postgres;

create table velocity_values
(
    id          serial
        primary key,
    speed_value varchar(255) not null
        constraint unique_speed_val
            unique,
    created_at  timestamp default CURRENT_TIMESTAMP
);

alter table velocity_values
    owner to postgres;

create table usr_acc_vel
(
    id              serial
        primary key,
    id_user         integer not null
        constraint fk_user
            references user_credentials
            on delete cascade,
    id_velocity     integer not null
        constraint fk_velocity
            references velocity_values
            on delete cascade,
    id_acceleration integer not null
        constraint fk_acceleration
            references acceleration_values
            on delete cascade,
    created_at      timestamp default CURRENT_TIMESTAMP,
    constraint unique_acc_vel_usr
        unique (id_user, id_acceleration, id_velocity)
);

alter table usr_acc_vel
    owner to postgres;

create view pg_stat_statements_info(dealloc, stats_reset) as
SELECT dealloc,
       stats_reset
FROM pg_stat_statements_info() pg_stat_statements_info(dealloc, stats_reset);

alter table pg_stat_statements_info
    owner to postgres;

grant select on pg_stat_statements_info to public;

create view pg_stat_statements
            (userid, dbid, toplevel, queryid, query, plans, total_plan_time, min_plan_time, max_plan_time,
             mean_plan_time, stddev_plan_time, calls, total_exec_time, min_exec_time, max_exec_time, mean_exec_time,
             stddev_exec_time, rows, shared_blks_hit, shared_blks_read, shared_blks_dirtied, shared_blks_written,
             local_blks_hit, local_blks_read, local_blks_dirtied, local_blks_written, temp_blks_read, temp_blks_written,
             blk_read_time, blk_write_time, temp_blk_read_time, temp_blk_write_time, wal_records, wal_fpi, wal_bytes,
             jit_functions, jit_generation_time, jit_inlining_count, jit_inlining_time, jit_optimization_count,
             jit_optimization_time, jit_emission_count, jit_emission_time)
as
SELECT userid,
       dbid,
       toplevel,
       queryid,
       query,
       plans,
       total_plan_time,
       min_plan_time,
       max_plan_time,
       mean_plan_time,
       stddev_plan_time,
       calls,
       total_exec_time,
       min_exec_time,
       max_exec_time,
       mean_exec_time,
       stddev_exec_time,
       rows,
       shared_blks_hit,
       shared_blks_read,
       shared_blks_dirtied,
       shared_blks_written,
       local_blks_hit,
       local_blks_read,
       local_blks_dirtied,
       local_blks_written,
       temp_blks_read,
       temp_blks_written,
       blk_read_time,
       blk_write_time,
       temp_blk_read_time,
       temp_blk_write_time,
       wal_records,
       wal_fpi,
       wal_bytes,
       jit_functions,
       jit_generation_time,
       jit_inlining_count,
       jit_inlining_time,
       jit_optimization_count,
       jit_optimization_time,
       jit_emission_count,
       jit_emission_time
FROM pg_stat_statements(true) pg_stat_statements(userid, dbid, toplevel, queryid, query, plans, total_plan_time,
                                                 min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time, calls,
                                                 total_exec_time, min_exec_time, max_exec_time, mean_exec_time,
                                                 stddev_exec_time, rows, shared_blks_hit, shared_blks_read,
                                                 shared_blks_dirtied, shared_blks_written, local_blks_hit,
                                                 local_blks_read, local_blks_dirtied, local_blks_written,
                                                 temp_blks_read, temp_blks_written, blk_read_time, blk_write_time,
                                                 temp_blk_read_time, temp_blk_write_time, wal_records, wal_fpi,
                                                 wal_bytes, jit_functions, jit_generation_time, jit_inlining_count,
                                                 jit_inlining_time, jit_optimization_count, jit_optimization_time,
                                                 jit_emission_count, jit_emission_time);

alter table pg_stat_statements
    owner to postgres;

grant select on pg_stat_statements to public;

create view all_functions_with_users(association_id, user_email, math_function, association_date) as
SELECT uf.id         AS association_id,
       u.email       AS user_email,
       mf.function   AS math_function,
       uf.created_at AS association_date
FROM user_functions uf
         JOIN user_credentials u ON uf.user_id = u.id
         JOIN math_functions mf ON uf.function_id = mf.id;

alter table all_functions_with_users
    owner to postgres;

create function pg_stat_statements_reset(userid oid default 0, dbid oid default 0, queryid bigint default 0) returns void
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pg_stat_statements_reset(oid, oid, bigint) owner to postgres;

create function pg_stat_statements_info(out dealloc bigint, out stats_reset timestamp with time zone) returns record
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pg_stat_statements_info(out bigint, out timestamp with time zone) owner to postgres;

create function pg_stat_statements(showtext boolean, out userid oid, out dbid oid, out toplevel boolean, out queryid bigint, out query text, out plans bigint, out total_plan_time double precision, out min_plan_time double precision, out max_plan_time double precision, out mean_plan_time double precision, out stddev_plan_time double precision, out calls bigint, out total_exec_time double precision, out min_exec_time double precision, out max_exec_time double precision, out mean_exec_time double precision, out stddev_exec_time double precision, out rows bigint, out shared_blks_hit bigint, out shared_blks_read bigint, out shared_blks_dirtied bigint, out shared_blks_written bigint, out local_blks_hit bigint, out local_blks_read bigint, out local_blks_dirtied bigint, out local_blks_written bigint, out temp_blks_read bigint, out temp_blks_written bigint, out blk_read_time double precision, out blk_write_time double precision, out temp_blk_read_time double precision, out temp_blk_write_time double precision, out wal_records bigint, out wal_fpi bigint, out wal_bytes numeric, out jit_functions bigint, out jit_generation_time double precision, out jit_inlining_count bigint, out jit_inlining_time double precision, out jit_optimization_count bigint, out jit_optimization_time double precision, out jit_emission_count bigint, out jit_emission_time double precision) returns setof setof record
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;

$$;

alter function pg_stat_statements(boolean, out oid, out oid, out boolean, out bigint, out text, out bigint, out double precision, out double precision, out double precision, out double precision, out double precision, out bigint, out double precision, out double precision, out double precision, out double precision, out double precision, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out bigint, out double precision, out double precision, out double precision, out double precision, out bigint, out bigint, out numeric, out bigint, out double precision, out bigint, out double precision, out bigint, out double precision, out bigint, out double precision) owner to postgres;

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

create function get_functions_by_email(provided_email text)
    returns TABLE(function_name text, user_email text)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT mf.function::TEXT AS function_name, uc.email::TEXT AS user_email
        FROM user_functions uf
                 JOIN user_credentials uc
                      ON uf.user_id = uc.id
                 JOIN math_functions mf
                      ON uf.function_id = mf.id
        WHERE uc.email = provided_email;
END;
$$;

alter function get_functions_by_email(text) owner to postgres;

create function get_user_sorting_details(input_user_email character varying)
    returns TABLE(algorithm_name character varying, sorting_speed character varying, added_on timestamp without time zone)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT
            a.algorithm AS algorithm_name,
            s.sorting_speed AS sorting_speed,
            us.created_at AS added_on
        FROM
            user_credentials uc
                JOIN
            user_sorting us ON uc.id = us.id_user
                JOIN
            algorithm a ON us.id_algorithm = a.id_algorithm
                JOIN
            sorting_speed s ON us.id_speed = s.id_speed
        WHERE
            uc.email = input_user_email;
END;
$$;

alter function get_user_sorting_details(varchar) owner to postgres;

create function insert_usr_acc_vel(user_email character varying, var_acc_value character varying, velocity_value character varying) returns void
    language plpgsql
as
$$
DECLARE
    var_user_id         INT;
    var_acceleration_id INT;
    var_velocity_id     INT;
BEGIN
    SELECT id
    INTO var_user_id
    FROM user_credentials
    WHERE email = user_email;

    IF var_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % does not exist', user_email;
    END IF;

    -- Get the ID of the acceleration value from acceleration_values table
    SELECT id
    INTO var_acceleration_id
    FROM acceleration_values
    WHERE var_acc_value = acc_value;

    IF var_acceleration_id IS NULL THEN
        INSERT INTO acceleration_values (acc_value)
        VALUES (var_acc_value)
        RETURNING id INTO var_acceleration_id;
    END IF;

    -- Get the ID of the velocity value from velocity_values table
    SELECT id
    INTO var_velocity_id
    FROM velocity_values
    WHERE speed_value = velocity_value;

    IF var_velocity_id IS NULL THEN
        insert into velocity_values (speed_value)
        values (velocity_value)
        returning id into var_velocity_id;
    END IF;

    -- Insert into usr_acc_vel table
    INSERT INTO usr_acc_vel (id_user, id_acceleration, id_velocity)
    VALUES (var_user_id, var_acceleration_id, var_velocity_id);

END;
$$;

alter function insert_usr_acc_vel(varchar, varchar, varchar) owner to postgres;

create function get_usr_acc_vel(user_email character varying)
    returns TABLE(acceleration_value character varying, velocity_value character varying, created_at timestamp without time zone)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT acc.acc_value   AS acceleration_value,
               vel.speed_value AS velocity_value,
               uav.created_at
        FROM usr_acc_vel uav
                 INNER JOIN
             user_credentials uc ON uav.id_user = uc.id
                 INNER JOIN
             acceleration_values acc ON uav.id_acceleration = acc.id
                 INNER JOIN
             velocity_values vel ON uav.id_velocity = vel.id
        WHERE uc.email = user_email;
END;
$$;

alter function get_usr_acc_vel(varchar) owner to postgres;

create function get_usr_acc_val(user_email character varying)
    returns TABLE(acceleration_value character varying, velocity_value character varying, created_at timestamp without time zone)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT acc.acc_value   AS acceleration_value,
               vel.speed_value AS velocity_value,
               uav.created_at
        FROM usr_acc_vel uav
                 INNER JOIN
             user_credentials uc ON uav.id_user = uc.id
                 INNER JOIN
             acceleration_values acc ON uav.id_acceleration = acc.id
                 INNER JOIN
             velocity_values vel ON uav.id_velocity = vel.id
        WHERE uc.email = user_email;
END;
$$;

alter function get_usr_acc_val(varchar) owner to postgres;

create function add_user_sorting_with_speed(input_user_email character varying, input_algorithm character varying, input_sorting_speed character varying)
    returns TABLE(user_id integer, algorithm_id integer, sorting_speed_id integer)
    language plpgsql
as
$$
DECLARE
    fetched_user_id INTEGER;
    fetched_algorithm_id INTEGER;
    fetched_sorting_speed_id INTEGER;
BEGIN
    -- Ensure the user exists, insert if not found
    SELECT id INTO fetched_user_id
    FROM user_credentials
    WHERE email = input_user_email;

    IF fetched_user_id IS NULL THEN
        INSERT INTO user_credentials (email, password) -- Replace `password` with a default value or allow NULL if applicable
        VALUES (input_user_email, 'default_password') -- Use a sensible default password or prompt for input
        RETURNING id INTO fetched_user_id;
    END IF;

    -- Get the algorithm ID based on the algorithm name
    SELECT id_algorithm INTO fetched_algorithm_id
    FROM algorithm
    WHERE algorithm = input_algorithm;

    -- If algorithm does not exist, insert it
    IF fetched_algorithm_id IS NULL THEN
        INSERT INTO algorithm (algorithm)
        VALUES (input_algorithm)
        RETURNING id_algorithm INTO fetched_algorithm_id;
    END IF;

    -- Get the sorting speed ID based on the sorting speed value
    SELECT id_speed INTO fetched_sorting_speed_id
    FROM sorting_speed
    WHERE sorting_speed = input_sorting_speed;

    -- If sorting speed does not exist, insert it
    IF fetched_sorting_speed_id IS NULL THEN
        INSERT INTO sorting_speed (sorting_speed)
        VALUES (input_sorting_speed)
        RETURNING id_speed INTO fetched_sorting_speed_id;
    END IF;

    -- Insert into user_sorting, ensuring no duplicates
    BEGIN
        INSERT INTO user_sorting (id_user, id_algorithm, id_speed)
        VALUES (fetched_user_id, fetched_algorithm_id, fetched_sorting_speed_id);
    END;

    -- Return the created or fetched entry
    RETURN QUERY
        SELECT fetched_user_id, fetched_algorithm_id, fetched_sorting_speed_id;
END;
$$;

alter function add_user_sorting_with_speed(varchar, varchar, varchar) owner to postgres;

