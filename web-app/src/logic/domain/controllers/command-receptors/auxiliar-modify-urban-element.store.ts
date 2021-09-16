import { UpdateUrbanElementUiDto } from "../../dto/ui/update-urban-element-ui-dto";
import { AbstractCommandReceptor } from "./abstract-command-receptor";

export abstract class AuxiliarModifyUrbanElementStore extends AbstractCommandReceptor<UpdateUrbanElementUiDto> {}
