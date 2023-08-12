import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Response, Request } from "express";
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError, QueryRunnerAlreadyReleasedError, TypeORMError } from "typeorm";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message;
    let status;
    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        break;
      case QueryRunnerAlreadyReleasedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryRunnerAlreadyReleasedError).message;
        break;
      case QueryRunnerAlreadyReleasedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryRunnerAlreadyReleasedError).message;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        break;
      case TypeORMError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as TypeORMError).message;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = (exception as InternalServerErrorException).message;
    }

    response
      .status(status)
      .json({
        status: status,
        message: message
      })
  }
}