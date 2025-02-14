import {Injectable, NestMiddleware, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {isUUID} from "class-validator";
import {Request, Response, NextFunction} from "express";

@Injectable()
export class IsExistMiddleware implements NestMiddleware {
    constructor(private readonly prismaService: PrismaService) {}

    models = {...this.prismaService}
    model : { findUnique: (args: unknown) => Promise<unknown> } | null = null;


use(modelName: string, key:string) {
        return async (req: Request, res: Response, next: NextFunction)=> {
            const id = req.params[key];

            try {
                if (!id || !isUUID(id)) {
                    throw new NotFoundException('Invalid ID format provided.');
                }


                Object.keys(this.models).filter((model, index) => {
                    if (model === modelName) {
                        this.model = (this.models as Record<string, any>)[model];
                    }});


                if (!this.model ) {
                    throw new NotFoundException(
                        `Model "${modelName}" is not recognized in PrismaService.`
                    );
                }

                const entity = await this.model!.findUnique({
                    where: { [key]: id },
                });

                if (!entity) {
                    throw new NotFoundException(`Resource with ID "${id}" not found.`);
                }
                next();
            } catch (err) {
                next(err);
            }
        }
    }
}
