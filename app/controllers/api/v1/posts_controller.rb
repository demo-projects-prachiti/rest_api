class Api::V1::PostsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  
def index
  @posts = Post.all
  @posts_with_urls = @posts.map do |post|
    if post.avatar.attached?
      { post: post, url: url_for(post.avatar), user: post.user.email }
    else
       { post: post,url: "", user: post.user.email }
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
