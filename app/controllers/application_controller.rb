class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :phone_number, :password, :password_confirmation) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :phone_number, :notifications, :password, :password_confirmation, :current_password, :avatar) }
  end

  def track_activity(trackable, action = params[:action])
    current_user.activities.create!(:action => action, :trackable => trackable)
  end
end
