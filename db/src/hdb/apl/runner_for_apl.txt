-- Insert operation parameters
truncate table "aa.movielens.db.hdb.apl::recommendation.function_header";
insert into "aa.movielens.db.hdb.apl::recommendation.function_header" values ('Oid', '#42');
insert into "aa.movielens.db.hdb.apl::recommendation.function_header" values ('LogLevel', '8');

truncate table "aa.movielens.db.hdb.apl::recommendation.operation_config";
insert into "aa.movielens.db.hdb.apl::recommendation.operation_config" values ('APL/ModelType'  , 'recommendation');
insert into "aa.movielens.db.hdb.apl::recommendation.operation_config" values ('APL/User'       , 'USERID'        ); -- mandatory
insert into "aa.movielens.db.hdb.apl::recommendation.operation_config" values ('APL/Item'       , 'MOVIEID'       ); -- mandatory
insert into "aa.movielens.db.hdb.apl::recommendation.operation_config" values ('APL/RuleWeight' , 'Support'       );

-- Clear other tables content
truncate table "aa.movielens.db.hdb.apl::recommendation.variable_descs";
truncate table "aa.movielens.db.hdb.apl::recommendation.operation_log";
truncate table "aa.movielens.db.hdb.apl::recommendation.summary";
truncate table "aa.movielens.db.hdb.apl::recommendation.indicators";

truncate table "aa.movielens.db.hdb.apl::recommendation.model";
truncate table "aa.movielens.db.hdb.apl::recommendation.model_node_user";
truncate table "aa.movielens.db.hdb.apl::recommendation.model_node_movie";
truncate table "aa.movielens.db.hdb.apl::recommendation.model_links";
truncate table "aa.movielens.db.hdb.apl::recommendation.model_sql_code";

call "aa.movielens.db.hdb.apl.afllang::recommendation"(
  "aa.movielens.db.hdb.apl::recommendation.function_header",
  "aa.movielens.db.hdb.apl::recommendation.operation_config",
  "aa.movielens.db.hdb.apl::recommendation.variable_descs",
  "aa.movielens.db.data::ratings",
  "aa.movielens.db.hdb.apl::recommendation.model",
  "aa.movielens.db.hdb.apl::recommendation.model_node_user",
  "aa.movielens.db.hdb.apl::recommendation.model_node_movie",
  "aa.movielens.db.hdb.apl::recommendation.model_links",
  "aa.movielens.db.hdb.apl::recommendation.operation_log",
  "aa.movielens.db.hdb.apl::recommendation.summary",
  "aa.movielens.db.hdb.apl::recommendation.indicators",
  "aa.movielens.db.hdb.apl::recommendation.model_sql_code"
) with overview;