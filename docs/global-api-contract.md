# Contrato de API Global (inline handlers)

Fuente: index.html (analisis estatico + templates JS)

- Total de atributos de handler inline detectados: 711
- Total en HTML estatico: 284
- Total de funciones invocadas por handlers inline: 357
- Convencion de riesgo: ALTO/MEDIO/BAJO (heuristica orientada a no romper contratos globales)

Columnas: nombre | dominio | tipo de handler | definicion | refs aprox | fuente | riesgo

## Auth / sesion
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addUser | onclick:1 | function global | 1 | html-estatico | ALTO |
| cancelChangePassword | onclick:1 | function global | 1 | html-estatico | ALTO |
| confirmResetUserPassword | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | html-estatico | ALTO |
| doLogin | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | html-estatico | ALTO |
| doLogout | onclick:1 | function global | 1 | html-estatico | ALTO |
| exitMaintenanceMode | onclick:1 | function global | 1 | html-estatico | ALTO |
| openChangePassword | onclick:1 | function global | 1 | html-estatico | ALTO |
| openEditUser | onclick:1 | function global | 1 | template-js | ALTO |
| openManageUsers | onclick:2 | function global | 2 | html-estatico | ALTO |
| openResetUserPassword | onclick:1 | function global | 1 | template-js | ALTO |
| probarLoginAzure | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| removeUser | onclick:1 | function global | 1 | template-js | ALTO |
| saveChangePassword | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | html-estatico | ALTO |
| saveEditUser | onclick:1 | function global | 1 | html-estatico | ALTO |
| togglePassVisible | onclick:1 | function global | 1 | template-js | ALTO |

## Tabs / navegacion
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| openTabPrivacySettings | onclick:1 | function global | 1 | template-js | ALTO |
| removeTab | onclick:5 | function global | 5 | mixto | ALTO |
| renameTab | ondblclick:9 | function global | 9 | mixto | ALTO |
| saveNewTab | onclick:1 | function global | 1 | html-estatico | ALTO |
| saveTabPrivacy | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| setClientsLayout | onclick:4 | function global | 4 | template-js | ALTO |
| setSueldosSubtab | onclick:3 | function global | 3 | template-js | ALTO |
| setTabLayout | onclick:4 | function global | 4 | template-js | ALTO |
| setTabYear | onchange:2 | function global | 2 | template-js | ALTO |
| switchSubTab | onclick:2 | function global | 2 | template-js | ALTO |
| switchTab | onclick:39 | function global | 39 | mixto | ALTO |
| toggleNewTabCols | onchange:2 | function global | 2 | html-estatico | ALTO |
| unlockTabAttempt | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | template-js | ALTO |

## Dashboard
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addKPI | onclick:1 | function global | 1 | template-js | BAJO |
| addMyDashKanbanCard | onkeydown:1 | function global | 1 | template-js | BAJO |
| addMyDashShortcut | onclick:1 | function global | 1 | template-js | BAJO |
| addMyDashStickyNote | onclick:1 | function global | 1 | template-js | BAJO |
| addMyDashTask | onclick:1, onkeydown:1 | function global | 2 | template-js | MEDIO |
| collapseAllDashSections | onclick:2 | function global | 2 | mixto | MEDIO |
| editMyDashTask | onclick:1, ondblclick:1 | function global | 2 | template-js | MEDIO |
| expandAllDashSections | onclick:2 | function global | 2 | mixto | MEDIO |
| onKPIToggleChange | onchange:1 | function global | 1 | template-js | BAJO |
| onMyDashKanbanDragStart | ondragstart:1 | function global | 1 | template-js | BAJO |
| onMyDashKanbanDrop | ondrop:1 | function global | 1 | template-js | BAJO |
| onMyDashSectionDragEnd | ondragend:1 | function global | 1 | template-js | BAJO |
| onMyDashSectionDragLeave | ondragleave:1 | function global | 1 | template-js | BAJO |
| onMyDashSectionDragOver | ondragover:1 | function global | 1 | template-js | BAJO |
| onMyDashSectionDragStart | ondragstart:1 | function global | 1 | template-js | BAJO |
| onMyDashSectionDrop | ondrop:1 | function global | 1 | template-js | BAJO |
| onMyDashTaskEditKey | onkeydown:1 | function global | 1 | template-js | BAJO |
| openAnnualKPIsConfig | onclick:1 | function global | 1 | template-js | BAJO |
| openDashDrill | onclick:6 | function global | 6 | mixto | ALTO |
| openMyDashSettings | onclick:1 | function global | 1 | template-js | BAJO |
| openShortcut | onclick:1 | function global | 1 | template-js | BAJO |
| removeKPI | onclick:1 | function global | 1 | template-js | BAJO |
| removeMyDashKanbanCard | onclick:1 | function global | 1 | template-js | BAJO |
| removeMyDashShortcut | onclick:1 | function global | 1 | template-js | BAJO |
| removeMyDashTask | onclick:2 | function global | 2 | template-js | MEDIO |
| resetDashLayout | onclick:2 | function global | 2 | mixto | MEDIO |
| saveAnnualKPIsConfig | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveMyDashShortcut | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveMyDashTaskEdit | onblur:1 | function global | 1 | template-js | BAJO |
| setDashMonth | onchange:2, onclick:1 | function global | 3 | mixto | MEDIO |
| toggleArchiveMyDashTask | onclick:2 | function global | 2 | template-js | MEDIO |
| toggleDashSection | onclick:4 | function global | 4 | mixto | MEDIO |
| toggleMyDashSection | onchange:6 | function global | 6 | mixto | ALTO |
| toggleMyDashTask | onchange:1 | function global | 1 | template-js | BAJO |
| toggleShortcutTargetField | onchange:1 | function global | 1 | html-estatico | BAJO |
| updateKPI | onblur:3 | function global | 3 | template-js | MEDIO |

## Clientes
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| clearClientesFilters | onclick:1 | function global | 1 | template-js | MEDIO |
| cliAddSection | onclick:1 | function global | 1 | template-js | MEDIO |
| click | onclick:2 | indirecta o no detectada | 2 | html-estatico | ALTO |
| cliDeleteSection | onclick:1 | function global | 1 | template-js | MEDIO |
| clienteId | onclick:14 | function global | 14 | template-js | ALTO |
| cliRenameSection | onclick:1 | function global | 1 | template-js | MEDIO |
| cliResetLayout | onclick:1 | function global | 1 | template-js | MEDIO |
| deleteCliente | onclick:5 | function global | 5 | mixto | ALTO |
| exportClientesPDF | onclick:1 | function global | 1 | template-js | MEDIO |
| exportClientesXLSX | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| openEditCliente | onclick:7 | function global | 7 | template-js | ALTO |
| openNewClienteModal | onclick:1 | function global | 1 | template-js | MEDIO |
| openTipoColorsEditor | onclick:1 | function global | 1 | template-js | MEDIO |
| resetTipoColors | onclick:1 | function global | 1 | template-js | MEDIO |
| saveClienteFromModal | onclick:2 | indirecta o no detectada | 2 | mixto | ALTO |
| selectCliente | onchange:1, onclick:1 | function global | 2 | template-js | MEDIO |
| toggleClienteArchived | onclick:5 | function global | 5 | mixto | ALTO |
| updateTipoColor | onchange:4 | function global | 4 | template-js | MEDIO |

## Empresas
Sin funciones detectadas en handlers inline para este dominio en la version auditada.

## Servicios profesionales
Sin funciones detectadas en handlers inline para este dominio en la version auditada.

## Sueldos
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| changeSueldoStatus | onchange:1 | function global | 1 | template-js | ALTO |
| clearSueldoFlagLabel | onclick:1 | function global | 1 | html-estatico | ALTO |
| copySueldosFromPreviousMonth | onclick:1 | function global | 1 | template-js | ALTO |
| filterSueldosByState | onclick:1 | function global | 1 | template-js | ALTO |
| openAddSueldoRow | onclick:1 | function global | 1 | template-js | ALTO |
| openSueldoFlagModal | onclick:2 | function global | 2 | template-js | ALTO |
| removeSueldoRow | onclick:1 | function global | 1 | template-js | ALTO |
| saveSueldoFlagLabel | onclick:1 | function global | 1 | html-estatico | ALTO |
| toggleSueldoFlag | onchange:1 | function global | 1 | template-js | ALTO |
| updateSueldoField | onblur:2 | function global | 2 | template-js | ALTO |

## Honorarios
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| honAddClient | onclick:1 | window.* | 1 | template-js | ALTO |
| honAddCol | onclick:1 | window.* | 1 | template-js | ALTO |
| honArchiveClient | onclick:1 | window.* | 1 | template-js | ALTO |
| honColors | onclick:1 | window.* | 1 | template-js | ALTO |
| honDelClient | onclick:2 | window.* | 2 | template-js | ALTO |
| honDelCol | onclick:1 | window.* | 1 | template-js | ALTO |
| honDoRestore | onclick:1 | window.* | 1 | template-js | ALTO |
| honEcCalc | oninput:2 | window.* | 2 | template-js | ALTO |
| honEdit | onclick:1 | window.* | 1 | template-js | ALTO |
| honManualBackup | onclick:2 | window.* | 2 | mixto | ALTO |
| honOpenClient | onclick:2 | window.* | 2 | template-js | ALTO |
| honOpenRestore | onclick:1 | window.* | 1 | html-estatico | ALTO |
| honRenameClient | onclick:2, ondblclick:2 | window.* | 4 | template-js | ALTO |
| honResetColors | onclick:1 | window.* | 1 | template-js | ALTO |
| honSaveClientEditor | onclick:2 | window.* | 2 | template-js | ALTO |
| honSaveColors | onclick:1 | window.* | 1 | template-js | ALTO |
| honSaveModal | onclick:2 | window.* | 2 | template-js | ALTO |
| honSetMonth | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| honSetView | onclick:2 | indirecta o no detectada | 2 | template-js | ALTO |
| honToggleArch | onchange:1 | window.* | 1 | template-js | ALTO |
| honToggleRecibo | onchange:1 | window.* | 1 | template-js | ALTO |
| honUnarchiveClient | onclick:2 | window.* | 2 | template-js | ALTO |

## Declaraciones
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| declAddRow | onclick:1 | window.* | 1 | template-js | ALTO |
| declAddType | onclick:1 | window.* | 1 | template-js | ALTO |
| declAddYear | onclick:1 | window.* | 1 | template-js | ALTO |
| declBackLanding | onclick:2 | window.* | 2 | template-js | ALTO |
| declCarryAll | onclick:4 | window.* | 4 | mixto | ALTO |
| declDeleteFromModal | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| declDeleteTrash | onclick:1 | window.* | 1 | template-js | ALTO |
| declDoCarry | onclick:2 | window.* | 2 | mixto | ALTO |
| declExportCSV | onclick:1 | window.* | 1 | template-js | ALTO |
| declineAnnualConversion | onclick:1 | function global | 1 | html-estatico | ALTO |
| declOnSearch | oninput:1 | window.* | 1 | template-js | ALTO |
| declOnTag | onchange:1 | window.* | 1 | template-js | ALTO |
| declOpenCarry | onclick:1 | window.* | 1 | template-js | ALTO |
| declOpenColorModal | onclick:1 | window.* | 1 | template-js | ALTO |
| declOpenTrash | onclick:1 | window.* | 1 | template-js | ALTO |
| declOpenType | onclick:1 | window.* | 1 | template-js | ALTO |
| declRemoveCol | onclick:1 | window.* | 1 | template-js | ALTO |
| declRemoveRow | onclick:1 | window.* | 1 | template-js | ALTO |
| declRestoreTrash | onclick:1 | window.* | 1 | template-js | ALTO |
| declSaveColors | onclick:2 | window.* | 2 | mixto | ALTO |
| declSaveFolderModal | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| declSet | onchange:6 | window.* | 6 | template-js | ALTO |
| declSetFilter | onchange:1 | window.* | 1 | template-js | ALTO |
| declSetView | onclick:2 | window.* | 2 | template-js | ALTO |
| declSetYear | onchange:1 | window.* | 1 | template-js | ALTO |
| declStepYear | onclick:2 | window.* | 2 | template-js | ALTO |
| declTabClick | onclick:2 | window.* | 2 | mixto | ALTO |

## Calendario
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addCurrentEventToGCal | onclick:1 | function global | 1 | html-estatico | MEDIO |
| calNext | onclick:1 | function global | 1 | template-js | MEDIO |
| calPrev | onclick:1 | function global | 1 | template-js | MEDIO |
| calToday | onclick:1 | function global | 1 | template-js | MEDIO |
| deleteCalEvent | onclick:1 | function global | 1 | html-estatico | MEDIO |
| exportToGCal | onclick:1 | function global | 1 | template-js | MEDIO |
| gotoCellNote | onclick:1 | function global | 1 | template-js | MEDIO |
| gotoDay | onclick:3, ondblclick:1 | function global | 4 | template-js | MEDIO |
| moveMinical | onclick:3 | function global | 3 | template-js | MEDIO |
| openNewCalEvent | onclick:1 | function global | 1 | template-js | MEDIO |
| openNewCalEventDate | onclick:3 | function global | 3 | template-js | MEDIO |
| openNewCalEventDateTime | onclick:1 | function global | 1 | template-js | MEDIO |
| saveCalEvent | onclick:1 | function global | 1 | html-estatico | MEDIO |
| saveGCalSettings | onclick:1 | function global | 1 | template-js | MEDIO |
| setCalView | onclick:1 | function global | 1 | template-js | MEDIO |
| showGCalHelp | onclick:1 | function global | 1 | template-js | MEDIO |
| syncFromGoogleCalendar | onclick:2 | indirecta o no detectada | 2 | template-js | ALTO |

## Tareas
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addTaskBlock | onclick:1, onkeydown:1 | function global | 2 | template-js | MEDIO |
| openTaskAssign | onclick:1 | function global | 1 | template-js | MEDIO |
| removeTaskBlock | onclick:1 | function global | 1 | template-js | MEDIO |
| saveTaskAssign | onclick:1 | function global | 1 | html-estatico | MEDIO |
| setTaskFilter | onclick:1 | function global | 1 | template-js | MEDIO |
| toggleTaskBlock | onchange:1 | function global | 1 | template-js | MEDIO |
| updateTaskBlockText | onblur:1 | function global | 1 | template-js | MEDIO |

## Notas
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addStudioStickyNote | onclick:1 | function global | 1 | template-js | MEDIO |
| clearStickyLink | onclick:1 | function global | 1 | template-js | MEDIO |
| createStickyGroup | onclick:1, onkeydown:1 | function global | 2 | html-estatico | MEDIO |
| cycleStickyColor | onclick:1 | function global | 1 | template-js | MEDIO |
| cycleStickySize | onclick:1 | function global | 1 | template-js | MEDIO |
| deleteStickyGroup | onclick:1 | function global | 1 | template-js | MEDIO |
| onStickyBlur | onblur:1 | function global | 1 | template-js | MEDIO |
| onStickyDragEnd | ondragend:1 | function global | 1 | template-js | MEDIO |
| onStickyDragLeave | ondragleave:1 | function global | 1 | template-js | MEDIO |
| onStickyDragOver | ondragover:1 | function global | 1 | template-js | MEDIO |
| onStickyDragStart | ondragstart:1 | function global | 1 | template-js | MEDIO |
| onStickyDrop | ondrop:1 | function global | 1 | template-js | MEDIO |
| onStickyFocus | onfocus:1 | function global | 1 | template-js | MEDIO |
| onStickyLinkKey | onkeydown:1 | function global | 1 | html-estatico | MEDIO |
| onStickyLinkSearch | oninput:1 | function global | 1 | html-estatico | MEDIO |
| openStickyClientLink | onclick:1 | function global | 1 | template-js | MEDIO |
| openStickyFeaturesModal | onclick:1 | function global | 1 | template-js | MEDIO |
| openStickyGroupAssign | onclick:1 | function global | 1 | template-js | MEDIO |
| openStickyGroupModal | onclick:1 | function global | 1 | template-js | MEDIO |
| openStickyShareModal | onclick:1 | function global | 1 | template-js | MEDIO |
| removeStickyNote | onclick:1 | function global | 1 | template-js | MEDIO |
| renameStickyGroup | onclick:1 | function global | 1 | template-js | MEDIO |
| saveStickyClientLink | onclick:1 | function global | 1 | html-estatico | MEDIO |
| saveStickyFeatures | onclick:1 | function global | 1 | html-estatico | MEDIO |
| saveStickyGroupAssign | onclick:1 | function global | 1 | html-estatico | MEDIO |
| saveStickyShare | onclick:1 | function global | 1 | html-estatico | MEDIO |
| stickyFmt | onclick:6 | function global | 6 | template-js | ALTO |
| stickyKeyHandler | onkeydown:1 | function global | 1 | template-js | MEDIO |
| stickyTitle | onclick:1 | function global | 1 | template-js | MEDIO |
| stickyToggleCheckbox | onclick:1 | function global | 1 | template-js | MEDIO |

## Chat
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| cancelEditingChatMessage | onclick:1 | function global | 1 | template-js | ALTO |
| closeChatPanel | onclick:1 | function global | 1 | html-estatico | ALTO |
| completeMention | onclick:1 | function global | 1 | template-js | ALTO |
| deleteChatMessage | onclick:5 | indirecta o no detectada | 5 | mixto | ALTO |
| handleChatSend | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| onChatAttachmentSelected | onchange:1 | function global | 1 | html-estatico | ALTO |
| onChatInputKeydown | onkeydown:1 | function global | 1 | html-estatico | ALTO |
| onChatSearchInput | oninput:1 | function global | 1 | html-estatico | ALTO |
| saveEditingChatMessage | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| setNotifChannel | onchange:3 | function global | 3 | template-js | ALTO |
| startEditingChatMessage | onclick:3 | function global | 3 | mixto | ALTO |
| switchChatChannel | onclick:4 | function global | 4 | mixto | ALTO |
| toggleChatPanel | onclick:1 | function global | 1 | html-estatico | ALTO |

## Notificaciones
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| askNotifPermission | onclick:1 | function global | 1 | template-js | MEDIO |
| clearAllNotifs | onclick:1 | function global | 1 | html-estatico | MEDIO |
| closeNotifPanel | onclick:1 | function global | 1 | html-estatico | MEDIO |
| markAllNotifsRead | onclick:1 | function global | 1 | html-estatico | MEDIO |
| openNotifLink | onclick:8 | function global | 8 | mixto | ALTO |
| openNotifSettings | onclick:1 | function global | 1 | html-estatico | MEDIO |
| requestBrowserNotifPermission | onclick:1 | function global | 1 | html-estatico | MEDIO |
| toggleNotifPanel | onclick:1 | function global | 1 | html-estatico | MEDIO |

## Configuracion
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| applyBranding | onchange:1 | function global | 1 | template-js | MEDIO |
| openHeaderLayoutSettings | onclick:1 | function global | 1 | html-estatico | MEDIO |
| openMasterCodeSettings | onclick:1 | function global | 1 | html-estatico | MEDIO |
| openYearSettings | onclick:1 | function global | 1 | html-estatico | MEDIO |
| removeMasterCode | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| saveMasterCode | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | html-estatico | ALTO |
| setDND | onchange:5 | function global | 5 | template-js | ALTO |
| setPanelZone | onchange:5 | function global | 5 | mixto | ALTO |
| toggleDndDay | onclick:1 | function global | 1 | template-js | MEDIO |
| togglePanelZone | onclick:2 | function global | 2 | mixto | MEDIO |
| updateBranding | oninput:2 | function global | 2 | html-estatico | MEDIO |
| updateColors | oninput:4 | function global | 4 | html-estatico | MEDIO |
| updateFonts | onchange:2 | function global | 2 | html-estatico | MEDIO |
| updatePrivacyModalSections | onchange:1 | function global | 1 | html-estatico | MEDIO |

## Auditoria
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| applyAuditFilters | onchange:6 | function global | 6 | html-estatico | ALTO |
| clearAuditFilters | onclick:1 | function global | 1 | html-estatico | ALTO |
| openAuditLogView | onclick:2 | function global | 2 | html-estatico | ALTO |
| openWriteLog | onclick:1 | window.* | 1 | html-estatico | ALTO |

## Papelera
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| emptyTrash | onclick:1 | function global | 1 | html-estatico | MEDIO |
| openTrashView | onclick:1 | function global | 1 | html-estatico | MEDIO |
| purgeTrashItem | onclick:1 | function global | 1 | template-js | MEDIO |
| restoreTrashItem | onclick:1 | function global | 1 | template-js | MEDIO |

## Builder
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| addBlockToBuilder | onclick:2 | function global | 2 | template-js | ALTO |
| addCTableRow | onclick:1 | function global | 1 | template-js | ALTO |
| addGalleryCard | onclick:1 | function global | 1 | template-js | ALTO |
| addKanbanCard | onclick:1 | function global | 1 | template-js | ALTO |
| addLinkBlock | onclick:1 | function global | 1 | template-js | ALTO |
| downloadFileBlock | onclick:1 | function global | 1 | template-js | ALTO |
| duplicateBuilderBlock | onclick:1 | function global | 1 | template-js | ALTO |
| editCTableColumn | onclick:2 | function global | 2 | template-js | ALTO |
| moveBuilderBlock | onclick:2 | function global | 2 | template-js | ALTO |
| onCTableFileUpload | onchange:1 | function global | 1 | template-js | ALTO |
| onFilesBlockUpload | onchange:1 | function global | 1 | template-js | ALTO |
| onImageBlockUpload | onchange:1 | function global | 1 | template-js | ALTO |
| openAddBlockModal | onclick:1 | function global | 1 | template-js | ALTO |
| openRowNAConfig | onclick:2 | function global | 2 | template-js | ALTO |
| quickAddRow | onclick:1 | function global | 1 | template-js | ALTO |
| removeBuilderBlock | onclick:1 | function global | 1 | template-js | ALTO |
| removeColumn | onclick:2 | function global | 2 | template-js | ALTO |
| removeCTableColumn | onclick:1 | function global | 1 | template-js | ALTO |
| removeCTableRow | onclick:1 | function global | 1 | template-js | ALTO |
| removeFileBlock | onclick:1 | function global | 1 | template-js | ALTO |
| removeGalleryCard | onclick:1 | function global | 1 | template-js | ALTO |
| removeKanbanCard | onclick:1 | function global | 1 | template-js | ALTO |
| removeLinkBlock | onclick:1 | function global | 1 | template-js | ALTO |
| removeRow | onclick:4 | function global | 4 | template-js | ALTO |
| saveBlockField | onblur:8, onchange:1 | function global | 9 | template-js | ALTO |
| saveBlockRichtext | onblur:1 | function global | 1 | template-js | ALTO |
| saveChartData | onblur:1 | function global | 1 | template-js | ALTO |
| saveRowNAConfig | onclick:1 | function global | 1 | html-estatico | ALTO |
| setCTableCell | onchange:10, onclick:2 | function global | 12 | template-js | ALTO |
| toggleRowLock | onclick:3 | function global | 3 | template-js | ALTO |
| updateGalleryCard | onblur:2 | function global | 2 | template-js | ALTO |
| updateKanbanCard | onblur:1 | function global | 1 | template-js | ALTO |
| updateKanbanColLabel | onblur:1 | function global | 1 | template-js | ALTO |

## Otros
| Nombre | Handler | Definicion | Refs | Fuente | Riesgo |
|---|---|---:|---:|---|---|
| applyPreset | onclick:6 | function global | 6 | html-estatico | ALTO |
| bbEscape | onclick:3 | function global | 3 | template-js | MEDIO |
| clearAnnualDateCell | onclick:1 | function global | 1 | html-estatico | BAJO |
| clearYearData | onclick:1 | function global | 1 | template-js | BAJO |
| closeCellCommentsModal | onclick:1 | function global | 1 | html-estatico | BAJO |
| closeHeaderMenu | onclick:8 | function global | 8 | html-estatico | ALTO |
| closeModal | onclick:106 | function global | 106 | mixto | ALTO |
| confirmAnnualConversion | onclick:1 | function global | 1 | html-estatico | BAJO |
| copyToClipboard | onclick:3 | function global | 3 | template-js | MEDIO |
| deleteCellComment | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| deleteSubTab | onclick:1 | function global | 1 | template-js | BAJO |
| editTag | onclick:1 | function global | 1 | template-js | BAJO |
| escapeJs | onclick:2 | indirecta o no detectada | 2 | template-js | ALTO |
| execCommand | onclick:7 | indirecta o no detectada | 7 | template-js | ALTO |
| exportAllXLSX | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| exportData | onclick:1 | function global | 1 | html-estatico | BAJO |
| exportHTML | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| filterStickiesByGroup | onclick:2 | function global | 2 | template-js | MEDIO |
| getElementById | onclick:3 | indirecta o no detectada | 3 | mixto | ALTO |
| goToClient | onclick:1 | function global | 1 | template-js | BAJO |
| importData | onchange:1 | function global | 1 | html-estatico | BAJO |
| max | onchange:1 | indirecta o no detectada | 1 | template-js | ALTO |
| min | onchange:1 | indirecta o no detectada | 1 | template-js | ALTO |
| moveYearTo | onclick:1 | function global | 1 | template-js | BAJO |
| onEditUserPhotoUpload | onchange:1 | function global | 1 | html-estatico | BAJO |
| onStickiesSearch | onclick:1, oninput:1 | function global | 2 | template-js | MEDIO |
| open | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| openAddCol | onclick:2 | function global | 2 | template-js | MEDIO |
| openAddEntity | onclick:2 | function global | 2 | template-js | MEDIO |
| openAddSubTab | onclick:2 | function global | 2 | template-js | MEDIO |
| openAddTab | onclick:2 | function global | 2 | mixto | MEDIO |
| openCellModal | onclick:3 | function global | 3 | template-js | MEDIO |
| openColConfig | onclick:3 | function global | 3 | template-js | MEDIO |
| openCustomize | onclick:2 | function global | 2 | mixto | MEDIO |
| openEditCalEvent | onclick:4 | function global | 4 | template-js | MEDIO |
| openEditMyProfile | onclick:1 | function global | 1 | html-estatico | BAJO |
| openMoveToSubTab | onclick:3 | function global | 3 | template-js | MEDIO |
| openYearRepairTool | onclick:1 | function global | 1 | template-js | BAJO |
| padStart | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| parseFloat | onchange:5 | indirecta o no detectada | 5 | template-js | ALTO |
| preventDefault | onclick:2, ondragover:1, onkeydown:1, onmousedown:8 | indirecta o no detectada | 12 | mixto | ALTO |
| prompt | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| remove | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| removeEditUserPhoto | onclick:1 | function global | 1 | html-estatico | BAJO |
| removePendingAttachment | onclick:1 | function global | 1 | template-js | BAJO |
| renameSubTab | ondblclick:1 | function global | 1 | template-js | BAJO |
| renderContent | onchange:1, onclick:3 | function global | 4 | template-js | MEDIO |
| repairByDate | onclick:1 | function global | 1 | template-js | BAJO |
| replace | onchange:4, onclick:2 | indirecta o no detectada | 6 | template-js | ALTO |
| resetAll | onclick:1 | function global | 1 | html-estatico | BAJO |
| resetLogo | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveAnnualDateCell | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveCellEdit | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveColConfig | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveNewCol | onclick:1 | function global | 1 | html-estatico | BAJO |
| saveNewEntity | onclick:1 | function global | 1 | html-estatico | BAJO |
| savePageContent | onblur:1 | function global | 1 | template-js | BAJO |
| saveState | onchange:1 | function global | 1 | template-js | BAJO |
| selectColType | onclick:1 | function global | 1 | template-js | BAJO |
| selectUserColor | onclick:13 | function global | 13 | mixto | ALTO |
| sendCellComment | onclick:1, onkeydown:1 | indirecta o no detectada | 2 | html-estatico | ALTO |
| setAgendaMode | onclick:2 | function global | 2 | template-js | MEDIO |
| setAnnualYear | onchange:1 | function global | 1 | template-js | BAJO |
| setMonthFilter | onclick:2 | function global | 2 | template-js | MEDIO |
| setTimeout | onclick:1 | indirecta o no detectada | 1 | html-estatico | ALTO |
| stopPropagation | onclick:34, ondblclick:2 | indirecta o no detectada | 36 | mixto | ALTO |
| String | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| toggleAnnualColType | onclick:1 | function global | 1 | template-js | BAJO |
| toggleAnnualShowAll | onclick:1 | function global | 1 | template-js | BAJO |
| toggleArchivedSection | onclick:3 | function global | 3 | template-js | MEDIO |
| toggleCliLayoutEdit | onclick:1 | function global | 1 | template-js | BAJO |
| toggleEditMode | onclick:2 | function global | 2 | mixto | MEDIO |
| toggleEventDone | onclick:3 | function global | 3 | template-js | MEDIO |
| toggleHeaderMenu | onclick:1 | function global | 1 | html-estatico | BAJO |
| toggleLogoInvert | onchange:1 | function global | 1 | html-estatico | BAJO |
| toggleStudioStickies | onclick:1 | function global | 1 | template-js | BAJO |
| updateCellModalFields | onchange:2 | function global | 2 | html-estatico | MEDIO |
| updateReliqField | onblur:2 | function global | 2 | template-js | MEDIO |
| updateUserAvatarPreview | onkeyup:1 | function global | 1 | html-estatico | BAJO |
| uploadLogo | onchange:1 | function global | 1 | html-estatico | BAJO |
| vaultDryRun | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| vaultLock | onclick:1 | function global | 1 | template-js | BAJO |
| vaultMigrateAll | onclick:1 | indirecta o no detectada | 1 | template-js | ALTO |
| vaultOpenChangePin | onclick:1 | function global | 1 | template-js | BAJO |
| vaultOpenSetup | onclick:1 | function global | 1 | template-js | BAJO |
| vaultOpenUnlock | onclick:1 | function global | 1 | template-js | BAJO |

## Notas
- Este contrato congela disponibilidad global de funciones invocadas por handlers inline.
- No implica congelar implementacion interna, pero si nombre accesible y firma esperada por el HTML/template.
- En Otros aparecen tambien llamadas nativas del navegador (ej. open, prompt, preventDefault, stopPropagation, getElementById).

