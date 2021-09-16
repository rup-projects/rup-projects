import { UrbanElementResponseGetAllDto } from "../../../domain/dto/ui/urban-element-response-get-all-dto";
import { AbstractCommandReceptor } from "./abstract-command-receptor";

export abstract class GetUrbanElementByConditionCommandReceptor extends AbstractCommandReceptor<UrbanElementResponseGetAllDto> {}