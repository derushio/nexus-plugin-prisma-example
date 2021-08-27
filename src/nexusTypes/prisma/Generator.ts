/// <reference types="../../generated/nexus" />

import { nexusPrisma } from '@kenchi/nexus-plugin-prisma';
import { makeSchema, queryType, mutationType, objectType } from 'nexus';

export function generateNexusType(
    types: Array<{
        typeName: string;
        typePluName: string;
        columns: string[];
    }>,
) {
    return [
        queryType({
            definition(t) {
                for (const type of types) {
                    t.crud[type.typeName]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                    t.crud[type.typePluName]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                }
            },
        }),
        mutationType({
            definition(t) {
                for (const type of types) {
                    t.crud[
                        `createOne${
                            type.typeName.charAt(0).toUpperCase() +
                            type.typeName.slice(1)
                        }`
                    ]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                    t.crud[
                        `deleteOne${
                            type.typeName.charAt(0).toUpperCase() +
                            type.typeName.slice(1)
                        }`
                    ]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                    t.crud[
                        `updateOne${
                            type.typeName.charAt(0).toUpperCase() +
                            type.typeName.slice(1)
                        }`
                    ]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                    t.crud[
                        `upsertOne${
                            type.typeName.charAt(0).toUpperCase() +
                            type.typeName.slice(1)
                        }`
                    ]({
                        filtering: true,
                        pagination: true,
                        ordering: true,
                    });
                }
            },
        }),
        ...types.map((type) => {
            return objectType({
                name:
                    type.typeName.charAt(0).toUpperCase() +
                    type.typeName.slice(1),
                definition(t) {
                    for (const column of type.columns) {
                        t.model[column]();
                    }
                },
            });
        }),
    ];
}
