-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/master_schema.sql
----------------------------------------------
-- LLMastery Database Master Schema
-- Created: May 1, 2025
-- Description: Main schema file that loads all components in correct order
----------------------------------------------

-- Load tables first
\i 'schema/tables/tables.sql'

-- Load enums
\i 'schema/enums/enums.sql'

-- Load functions
\i 'schema/functions/fn_update_timestamp.sql'
\i 'schema/functions/fn_handle_new_user.sql'
\i 'schema/functions/fn_increment_user_pts.sql'
\i 'schema/functions/fn_update_usr_streak.sql'
\i 'schema/functions/fn_is_content_available.sql'
\i 'schema/functions/fn_handle_credit_transaction.sql'
\i 'schema/functions/fn_check_and_award_badges.sql'
\i 'schema/functions/fn_update_comment_count.sql'
\i 'schema/functions/fn_update_like_count.sql'
\i 'schema/functions/fn_update_group_member_count.sql'

-- Load triggers after functions
\i 'schema/triggers/tg_on_auth_user_created.sql'
\i 'schema/triggers/tg_all_tables_updated_at.sql'
\i 'schema/triggers/tg_update_usr_streak.sql'
\i 'schema/triggers/tg_process_credit_transaction.sql'
\i 'schema/triggers/tg_award_badges_on_lesson_completion.sql'
\i 'schema/triggers/tg_update_post_comment_count.sql'
\i 'schema/triggers/tg_update_like_counts.sql'
\i 'schema/triggers/tg_update_community_group_member_count.sql'

-- Load indexes
\i 'schema/indexes/indexes.sql'

-- Apply RLS policies
\i 'schema/policies/rls_policies.sql'