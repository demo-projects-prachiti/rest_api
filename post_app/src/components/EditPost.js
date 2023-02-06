import React from 'react'

export default function EditPost() {
    
    return (
        <div className='container'>
            <h2>Edit Post</h2>
            <form onSubmit={postData}>
                <div className='form-group'>
                    <label>Title</label>
                    <input type="text" name="title" className='form-control' value={state.name} onChange={handler} />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input type="text" name="description" className='form-control' value={state.price} onChange={handler} />
                </div>
                <input type="submit" value="Edit" className='btn btn-success' />
            </form>
        </div>
    )
}
