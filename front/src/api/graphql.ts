//Creamos un controlador GraphQL que permita
//validar las credenciales del usuario.
import { ApolloServer, gql } from "apollo-server";
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import dotenv from 'react-dotenv';
dotenv.config();

const users = [{
    id: '1',
    name: 'Dan Anguiano',
    email: 'dananguiano@example.com',
    passwordHash: `we$&%475mxlvcñkjeawprgfdn2658j{vcxng},mcerhgt22@@ncoñdhg` // hash para 'DanAngui123*'
}];

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        loginUser(email: String!, password: String!): User
    }
`;

const secret = process.env.JWT_SECRET as string;

const resolvers = {
    Query: {
        loginUser: async (parent: {}, { email, password }: { email: string, password: string }) => {

            const user = users.find((u) => u.email === email);
            if (!user) {
                throw new Error('email not found');
            };

            const passwordMatch = await compare(password, user.passwordHash);
            if (!passwordMatch) {
                throw new Error("wrong password");
            };

            const token = jwt.sign({ sub: user.id }, secret);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export default server.createHandler({ path: '/api/graphql' });
