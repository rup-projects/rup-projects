import { Group } from "../../../domain/models/group";
import { AbstractCommandReceptor } from "./abstract-command-receptor";

export abstract class GetAllGroupCommandReceptor extends AbstractCommandReceptor<Group[]> {}