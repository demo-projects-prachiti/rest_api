class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :update, :destroy, :update_profile]

  # GET /posts
  
def index
  @posts = Post.all
  # @posts.attributes
  @posts_with_urls = @posts.map do |post|
    if post.avatar.attached?
      post.attributes.merge(url: url_for(post.avatar))
      # { post: post, url: url_for(post.avatar), user: post.user.email, current_user: current_user}
    else
      post.attributes.merge(user: post.user,current_user_email: current_user.email)
       # { post: post,url: "", user: post.user,current_user_email: current_user.email }
    end
  end
  render json: @posts_with_urls
end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update_profile
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    render json: {
      status: {code: 204, message: 'Post deleted sucessfully.'}}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :description, :avatar, :user_id)
    end
end
