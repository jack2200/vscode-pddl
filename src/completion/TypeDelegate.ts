/* --------------------------------------------------------------------------------------------
 * Copyright (c) Jan Dolejsi. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { CompletionItem, CompletionItemKind } from 'vscode';
import { PddlWorkspace } from 'pddl-workspace';
import { FileInfo } from 'pddl-workspace';
import { Delegate } from './Delegate';

export class TypeDelegate extends Delegate {

    constructor(public workspace: PddlWorkspace) {
        super();
    }

    getTypeItems(fileInfo: FileInfo): CompletionItem[] {
        return this.getTypes(fileInfo).map(t => this.createType(t));
    }

    getTypes(fileInfo: FileInfo): string[] {
        const domainInfo = this.workspace.asDomain(fileInfo);
        return domainInfo ? domainInfo.getTypes() : [];
    }

    createType(typeName: string): CompletionItem {
        const completionItem = this.createCompletionItem(typeName, 'Type', '', CompletionItemKind.Class);
        completionItem.insertText = ' ' + typeName; // prefix with a space for formatting
        completionItem.filterText = '- ' + typeName;
        return completionItem;
    }
}