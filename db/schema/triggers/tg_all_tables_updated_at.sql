-- Create triggers for updating timestamps on all tables
CREATE TRIGGER update_lessons_timestamp BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_quizzes_timestamp BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_challenges_timestamp BEFORE UPDATE ON challenges FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_user_profiles_timestamp BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_badges_timestamp BEFORE UPDATE ON badges FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_pricing_plans_timestamp BEFORE UPDATE ON pricing_plans FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_credit_packages_timestamp BEFORE UPDATE ON credit_packages FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_learning_paths_timestamp BEFORE UPDATE ON learning_paths FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_lesson_progress_timestamp BEFORE UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_user_subscriptions_timestamp BEFORE UPDATE ON user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_payments_timestamp BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_content_feedback_timestamp BEFORE UPDATE ON content_feedback FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_community_groups_timestamp BEFORE UPDATE ON community_groups FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_group_posts_timestamp BEFORE UPDATE ON group_posts FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_post_comments_timestamp BEFORE UPDATE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_learning_resources_timestamp BEFORE UPDATE ON learning_resources FOR EACH ROW EXECUTE FUNCTION update_timestamp();
