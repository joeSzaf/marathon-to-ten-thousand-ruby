class Api::V1::ActivitiesController < ApiController
  respond_to :json

  def index
    render json: { activities: serialized_activities }
  end

  def create

    activity = Activity.new(activity_params)
    activity.user = current_user
    binding.pry

    if activity.save
      render json: { activity: activity }
    else
      render json: { activity: activity }
    end
  end

  def show
    render json: Activity.find(params[:id])
  end

  def update
    activity = Activity.find(params['id'])
    activity.update(activity_params)
    respond_with Activity, json: activity
  end

  def activity_params
    params.require(:activity).permit(:name, :category, :date, :duration, :note)
  end

  def serialized_activities
    ActiveModel::Serializer::ArraySerializer.new(Activity.all, each_serializer: ActivitySerializer)
  end

end
