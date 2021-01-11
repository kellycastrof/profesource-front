import React, { useState, useEffect } from 'react'
import Subject_List from '@search_f/Subject_List'
import Message from '@welcome_m/Message'
import SEO from '@structure_f/seo'
import Layout from '@structure_f/Layout'
import PostCells from '@post_f/PostCells'
import PreComment from '@comments_f/PreComment'
import Comment from '@comments_f/Comment'
import axios from 'axios'

const PostPage = (props) => {
  var info = props.location.state;
  var value = {};
  const [comments, setComment] = useState([])
  useEffect(async () => {
    await
      axios
        .get(`http://localhost:3000/api/answers/consultByPost/${info.id}`)
        .then((response) => {
          setComment(response.data)
        })
        .catch((error) => {
          console.log(error)
        })


  }, [])



  function getTime(dateTime) {
    var test = new Date(dateTime);
    test = test.toLocaleString();
  }


  const removeData = (id) => {
    axios.delete(`http://localhost:3000/api/answers/delete/${id}`).then(res => {
      console.log(res)
    })
  }

  function loadComments() {
    return <div>
      {comments.map((comment, i) => {
        return (
          <Comment
            id={comment.id_answer}
            username={comment.username}
            time="10 horas"
            content={comment.Answer}
            id_Post={comment.id_Post}
            onDelete={() => { removeData(comment.id_answer) }}
          />
        );
      })}
    </div>
  }

  async function postComment() {
    try {
      var response = await axios.post(`http://localhost:3000/api/answers/register`, value)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
      return response;

    } catch (e) {
      console.log(e);
      return null;
    }
  }


  return (
    <Layout title={props.title}>
      <SEO title="Post" />

      <div class="float-right w-64 column hidden lg:block">
        <div className="message bg">
          <Message />
        </div>
        <hr />
        <div className="mt-5 subject">
          <Subject_List />
        </div>
      </div>

      <div className="flex flex-col ">
        <div className=" text-4xl font-bold text-gray-800  justify-around ">
          <div>
            
          </div>
          <div>
            
          </div>

          <div id="loadcomments">
            {/*loadComments()*/}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default PostPage
