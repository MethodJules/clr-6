<template>
    <div>
       <h2> Comments </h2>
        <ul id="comments">
            <li v-for="comment in comments" :key="comment.id">
                <div class="comment">
                    <div class="user">
                        <b>{{comment.user}}</b>
                    </div>

                    <div class="message">
                        <div>
                            {{comment.text}}
                        </div>
                    </div>

                    <div class="post-date text-faded">
                        <AppDate :timestamp="comment.time" />
                    </div>
                </div>

            </li>
        </ul>
        
        
        <form @submit.prevent="save">
            <div class="form-group">
                <table>
                    <tr>
                        <td> Name: </td>
                        <td> <input name="" v-model="name" /> </td>
                    </tr>
                    <tr>
                        <td>  Message: </td>
                        <td> 
                            <textarea name=""
                                id=""
                                cols="30"
                                rows="5"
                                class="form-input"
                                v-model="text">
                            </textarea> 
                        </td>
                    </tr>
                </table>
            </div>

            <div class="form-actions">
                <button class="btn-red">Send Comment</button>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    props: {
      threadId: {
        required: true
      }
    },
    data () {
      return {
          text: '',
          name: '',
          id: 2,
          comments: [
              {
                  id: 0,
                  text: "This is a comment", 
                  user: "Max Mustermann",
                  time: 1607439271
              },
              {
                  id: 1,
                  text: "Great Job",
                  user: "Benutzer",
                  time: 1607899271
              }
          ]
      }
    },
    methods: {
        save() {

            const post = {
                id: this.id,
                text: this.text,
                time: Math.floor(Date.now() / 1000),
                user: this.name
             }

            this.text = ''
            this.id += 1;

        this.comments.push(post);
      }
    }
  }
</script>

<style scoped>

    .comment {
        display: flex;
        flex-wrap: wrap;
        background-color: white;
        padding: 20px 10px;
        padding-bottom: 7px;
        margin-bottom: 10px;
        margin-left: 5%;
        box-shadow: 2px 2px 1px rgba(136, 136, 136, 0.09);
        width: 90%;
        border: solid;
        border-color: lightgray;
        border-width: 1px;
    }

    .user{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: center;
        flex: 1 1 15%;
        margin-right: 5px;
    }

    .post-date {
        flex-basis: 100%;
        font-size: 14px;
        text-align: right;
        margin-bottom: 5px;
        padding-right: 7px;
    }

    .message {
        display: flex;
        flex: 1 1 83%;
        padding-left: 15px;
        padding-right: 10px;
        font-size: 16px;
        text-align: justify;
        line-height: 1.5;
        word-break: break-word;
    }

    h2 {
        color: #c93e37;
    }

    .form-group {
        width: 90%;
        margin-left: 5%;
    }
    .form {
        width: 50%;
    }
</style>
