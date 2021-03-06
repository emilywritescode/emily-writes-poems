const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Poem = new Schema(
    {
       poem_id : {
           type: String
       },
       poem_title: {
           type: String
       },
       poem_date: {
           type: String
       },
       poem_text: [{
           type: String
       }],
       poem_wordcount: {
           type: Number
       },
       poem_linecount: {
           type: Number
       },
       poem_behind_title: {
           type: String
       },
       poem_behind_poem: {
           type: String
       },
       top_words : {
           word : String,
           freq : Number
       },
       poem_collections_ids : [{
            type: String
       }],
       similar_poems_ids : [{
           type: String
       }],
       similar_poems_titles : [{
           type: String
       }]
   },
   { collection: 'poems-list'}
);

module.exports = mongoose.model('Poem', Poem);
