const { ApolloServer, gql } = require("apollo-server");





const typeDefs = gql`
  type Phrase {
    quote: String  
    author: String
  }

  type Query {
    Getquotes: [Phrase],
    Getquote(id:String!):Phrase
  }
  type Mutation {
      CreateQuote(id: String!,quote: String!, author: String!): Phrase
      DeleteQuote(id: String!): Phrase
      UpdateQuote(id: String!,quote: String!, author: String!): Phrase
  }
`;

let quotes =[
  {
    "id": "1",
    "quote": "Let's see, how shouild i put this? I'm in, you're out.",
    "author": "Walter White"
  },
  {
    "id": "2",
    "quote": "I do not believe fear to be an effective motivator. I want investment. For now, I'm simply interested in time frame",
    "author": "Gustavo Fring"
  },
  {
    "id": "3",
    "quote": "I watched Jane die. I was there. And I watched her die.",
    "author": "Walter White"
  },
  {
    "id": "4",
    "quote": "Yeah, bitch! Magnets!",
    "author": "Jesse Pinkman"
  },
  {
    "id": "5",
    "quote": "The thing is, if you just do stuff and nothing happens, what's it all mean? What's the point? Oh right, this whole thing is about self-acceptance.",
    "author": "Jesse Pinkman"
  },
  {
    "id": "6",
    "quote": "Better call Saul!",
    "author": "Saul Goodman"
  },
  {
    "id": "7",
    "quote": "If I ever get anal polyps, I'll know what to name them.",
    "author": "Saul Goodman"
  },
  {
    "id": "8",
    "quote": "You know how they say 'it's been a pleasure'? Well... it hasn't.",
    "author": "Mike Ehrmantraut"
  },
  {
    "id": "9",
    "quote": "Fear is the real enemy.",
    "author": "Walter White"
  },
  {
    "id": "10",
    "quote": "If you’re committed enough, you can make any story work.",
    "author": "Saul Goodman"
  }
]
  const resolvers = {
    Mutation: {
        CreateQuote: (_,arg) => {phrase.push(arg); return arg},
        DeleteQuote: (_,arg) => { 
                                 let finalquotes=quotes.filter(phrase => phrase.id != arg.id);
                                 let quotedeleted = quotes.find(phrase => phrase.id == arg.id );   
                                 quotes = [...finalquotes]; 
                                 return quotedeleted
                                },
        UpdateQuote:(_,arg) => {  let objIdx = quotes.findIndex(phrase => phrase.id == arg.id);
                                 quotes[objIdx] = arg
                                 return arg   
             
                              }                        

    },  
    Query: {
      Getquotes: () => quotes,
      Getquote: (_,arg) => quotes.find(number => number.id==arg.id)
    },
  };


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});