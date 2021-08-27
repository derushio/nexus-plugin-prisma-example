/// <reference types="./generated/nexus" />
import * as path from 'path';
import { nexusPrisma } from '@kenchi/nexus-plugin-prisma';
import { makeSchema, queryType, mutationType, objectType } from 'nexus';

import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { generateNexusType } from './nexusTypes/prisma/Generator';

const schema = makeSchema({
    sourceTypes: {
        modules: [
            {
                module: require.resolve('.prisma/client/index.d.ts'),
                alias: 'prisma',
            },
        ],
    },
    types: generateNexusType([
        {
            typeName: 'user',
            typePluName: 'users',
            columns: ['id', 'name', 'createdAt', 'updatedAt', 'posts'],
        },
        {
            typeName: 'post',
            typePluName: 'posts',
            columns: [
                'id',
                'title',
                'desc',
                'userId',
                'createdAt',
                'updatedAt',
                'User_posts___Post',
            ],
        },
    ]),
    plugins: [
        nexusPrisma({
            experimentalCRUD: true,
        }),
    ],
    outputs: {
        schema: true, // means schema.graphql in the root
        typegen: path.join(__dirname, 'generated/nexus.d.ts'),
    },
});

const prisma = new PrismaClient();

const server = new ApolloServer({
    schema,
    context() {
        return {
            prisma,
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
