class Api::V1::CommentsController < ApplicationController
	before_action :set_post

	def create
		@comment = @post.comments.create(comment_params)
		redirect_to post_path(@post)
	end

	def index
		@comments = @post.comments
    	render json: @comments
	end

	def show
		@comment = @post.comments.find(params[:id])
		render json: @comment
	end

	def destroy
		@comment = @post.comments.find(params[:id])
		@comment.destroy
	end


  	private
	    def comment_params
			params.require(:comment).permit(:commenter, :body)
	    end

	    def set_post
	    	@post = Post.find(params[:post_id])
	    end 
end


