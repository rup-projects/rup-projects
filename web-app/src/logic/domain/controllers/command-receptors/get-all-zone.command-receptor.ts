import { Zone } from "../../../domain/models/zone";
import { AbstractCommandReceptor } from "./abstract-command-receptor";

export abstract class GetAllZoneCommandReceptor extends AbstractCommandReceptor<Zone[]> {}