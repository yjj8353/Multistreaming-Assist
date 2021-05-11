Unicode True

; Script generated by the HM NIS Edit Script Wizard.

; HM NIS Edit Wizard helper defines
!define PRODUCT_NAME "Multistreaming-Assist"
!define PRODUCT_VERSION "1.0.1"
!define PRODUCT_PUBLISHER "���ڴٸ�TV"
!define PRODUCT_WEB_SITE "https://github.com/yjj8353/Multistreaming-Assist"
!define PRODUCT_DIR_REGKEY "Software\Microsoft\Windows\CurrentVersion\App Paths\Multistreaming-Assist.exe"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"
!define PRODUCT_UNINST_ROOT_KEY "HKLM"
!define PRODUCT_ROOT_DIR "C:\git\Multistreaming-Assist"

; MUI 1.67 compatible ------
!include "MUI.nsh"

; MUI Settings
!define MUI_ABORTWARNING
!define MUI_ICON "${PRODUCT_ROOT_DIR}\src-electron\icons\icon.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\modern-uninstall.ico"

; Welcome page
!insertmacro MUI_PAGE_WELCOME
; License page
!insertmacro MUI_PAGE_LICENSE "${PRODUCT_ROOT_DIR}\���̼���.txt"
; Directory page
!insertmacro MUI_PAGE_DIRECTORY
; Instfiles page
!insertmacro MUI_PAGE_INSTFILES
; Finish page
!define MUI_FINISHPAGE_RUN "$INSTDIR\Multistreaming-Assist.exe"
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages
!insertmacro MUI_UNPAGE_INSTFILES

; Language files
!insertmacro MUI_LANGUAGE "Korean"

; MUI end ------

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "MA-Setup.exe"
InstallDir "C:\Multistreaming-Assist"
InstallDirRegKey HKLM "${PRODUCT_DIR_REGKEY}" ""
ShowInstDetails show
ShowUnInstDetails show

Section "�ʼ� ��ġ" SEC01
  SetOutPath "$INSTDIR"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\chrome_100_percent.pak"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\chrome_200_percent.pak"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\d3dcompiler_47.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\ffmpeg.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\icudtl.dat"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\libEGL.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\libGLESv2.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\LICENSES.chromium.html"
  File "${PRODUCT_ROOT_DIR}\LICENSE"
  SetOutPath "$INSTDIR\locales"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\am.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ar.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\bg.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\bn.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ca.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\cs.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\da.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\de.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\el.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\en-GB.pak"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\en-US.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\es-419.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\es.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\et.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\fa.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\fi.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\fil.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\fr.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\gu.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\he.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\hi.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\hr.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\hu.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\id.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\it.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ja.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\kn.pak"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ko.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\lt.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\lv.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ml.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\mr.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ms.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\nb.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\nl.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\pl.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\pt-BR.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\pt-PT.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ro.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ru.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\sk.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\sl.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\sr.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\sv.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\sw.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\ta.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\te.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\th.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\tr.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\uk.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\vi.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\zh-CN.pak"
  ; File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\locales\zh-TW.pak"
  SetOutPath "$INSTDIR"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\Multistreaming-Assist.exe"
  CreateDirectory "$SMPROGRAMS\Multistreaming-Assist"
  CreateShortCut "$SMPROGRAMS\Multistreaming-Assist\Multistreaming-Assist.lnk" "$INSTDIR\Multistreaming-Assist.exe"
  CreateShortCut "$DESKTOP\Multistreaming-Assist.lnk" "$INSTDIR\Multistreaming-Assist.exe"
  SetOutPath "$INSTDIR\nginx\conf"
  File "${PRODUCT_ROOT_DIR}\nginx\conf\mime.types"
  SetOutPath "$INSTDIR\nginx"
  File "${PRODUCT_ROOT_DIR}\nginx\nginx.exe"
  SetOutPath "$INSTDIR\resources"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\resources\app.asar"
  SetOutPath "$INSTDIR"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\resources.pak"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\snapshot_blob.bin"
  SetOutPath "$INSTDIR\swiftshader"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\swiftshader\libEGL.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\swiftshader\libGLESv2.dll"
  SetOutPath "$INSTDIR"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\v8_context_snapshot.bin"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\version"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\vk_swiftshader.dll"
  File "${PRODUCT_ROOT_DIR}\dist\electron\Multistreaming-Assist-win32-x64\vk_swiftshader_icd.json"
SectionEnd

Section -AdditionalIcons
  CreateShortCut "$SMPROGRAMS\Multistreaming-Assist\Uninstall.lnk" "$INSTDIR\uninst.exe"
SectionEnd

Section -Post
  WriteUninstaller "$INSTDIR\uninst.exe"
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR\Multistreaming-Assist.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayName" "$(^Name)"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "UninstallString" "$INSTDIR\uninst.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayIcon" "$INSTDIR\Multistreaming-Assist.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "URLInfoAbout" "${PRODUCT_WEB_SITE}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"
SectionEnd


Function un.onUninstSuccess
  HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "$(^Name)��(��) ������ ���ŵǾ����ϴ�."
FunctionEnd

Function un.onInit
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "$(^Name)��(��) �����Ͻðڽ��ϱ�?" IDYES +2
  Abort
FunctionEnd

Section Uninstall
  Delete "$INSTDIR\uninst.exe"
  Delete "$INSTDIR\vk_swiftshader_icd.json"
  Delete "$INSTDIR\vk_swiftshader.dll"
  ; Delete "$INSTDIR\version"
  Delete "$INSTDIR\v8_context_snapshot.bin"
  Delete "$INSTDIR\swiftshader\libGLESv2.dll"
  Delete "$INSTDIR\swiftshader\libEGL.dll"
  Delete "$INSTDIR\snapshot_blob.bin"
  Delete "$INSTDIR\resources.pak"
  Delete "$INSTDIR\resources\app.asar"
  Delete "$INSTDIR\nginx\nginx.exe"
  Delete "$INSTDIR\nginx\conf\mime.types"
  Delete "$INSTDIR\Multistreaming-Assist.exe"
  ; Delete "$INSTDIR\locales\zh-TW.pak"
  ; Delete "$INSTDIR\locales\zh-CN.pak"
  ; Delete "$INSTDIR\locales\vi.pak"
  ; Delete "$INSTDIR\locales\uk.pak"
  ; Delete "$INSTDIR\locales\tr.pak"
  ; Delete "$INSTDIR\locales\th.pak"
  ; Delete "$INSTDIR\locales\te.pak"
  ; Delete "$INSTDIR\locales\ta.pak"
  ; Delete "$INSTDIR\locales\sw.pak"
  ; Delete "$INSTDIR\locales\sv.pak"
  ; Delete "$INSTDIR\locales\sr.pak"
  ; Delete "$INSTDIR\locales\sl.pak"
  ; Delete "$INSTDIR\locales\sk.pak"
  ; Delete "$INSTDIR\locales\ru.pak"
  ; Delete "$INSTDIR\locales\ro.pak"
  ; Delete "$INSTDIR\locales\pt-PT.pak"
  ; Delete "$INSTDIR\locales\pt-BR.pak"
  ; Delete "$INSTDIR\locales\pl.pak"
  ; Delete "$INSTDIR\locales\nl.pak"
  ; Delete "$INSTDIR\locales\nb.pak"
  ; Delete "$INSTDIR\locales\ms.pak"
  ; Delete "$INSTDIR\locales\mr.pak"
  ; Delete "$INSTDIR\locales\ml.pak"
  ; Delete "$INSTDIR\locales\lv.pak"
  ; Delete "$INSTDIR\locales\lt.pak"
  Delete "$INSTDIR\locales\ko.pak"
  ; Delete "$INSTDIR\locales\kn.pak"
  ; Delete "$INSTDIR\locales\ja.pak"
  ; Delete "$INSTDIR\locales\it.pak"
  ; Delete "$INSTDIR\locales\id.pak"
  ; Delete "$INSTDIR\locales\hu.pak"
  ; Delete "$INSTDIR\locales\hr.pak"
  ; Delete "$INSTDIR\locales\hi.pak"
  ; Delete "$INSTDIR\locales\he.pak"
  ; Delete "$INSTDIR\locales\gu.pak"
  ; Delete "$INSTDIR\locales\fr.pak"
  ; Delete "$INSTDIR\locales\fil.pak"
  ; Delete "$INSTDIR\locales\fi.pak"
  ; Delete "$INSTDIR\locales\fa.pak"
  ; Delete "$INSTDIR\locales\et.pak"
  ; Delete "$INSTDIR\locales\es.pak"
  ; Delete "$INSTDIR\locales\es-419.pak"
  Delete "$INSTDIR\locales\en-US.pak"
  ; Delete "$INSTDIR\locales\en-GB.pak"
  ; Delete "$INSTDIR\locales\el.pak"
  ; Delete "$INSTDIR\locales\de.pak"
  ; Delete "$INSTDIR\locales\da.pak"
  ; Delete "$INSTDIR\locales\cs.pak"
  ; Delete "$INSTDIR\locales\ca.pak"
  ; Delete "$INSTDIR\locales\bn.pak"
  ; Delete "$INSTDIR\locales\bg.pak"
  ; Delete "$INSTDIR\locales\ar.pak"
  ; Delete "$INSTDIR\locales\am.pak"
  Delete "$INSTDIR\LICENSES.chromium.html"
  Delete "$INSTDIR\LICENSE"
  Delete "$INSTDIR\libGLESv2.dll"
  Delete "$INSTDIR\libEGL.dll"
  Delete "$INSTDIR\icudtl.dat"
  Delete "$INSTDIR\ffmpeg.dll"
  Delete "$INSTDIR\d3dcompiler_47.dll"
  Delete "$INSTDIR\chrome_200_percent.pak"
  Delete "$INSTDIR\chrome_100_percent.pak"

  Delete "$SMPROGRAMS\Multistreaming-Assist\Uninstall.lnk"
  Delete "$DESKTOP\Multistreaming-Assist.lnk"
  Delete "$SMPROGRAMS\Multistreaming-Assist\Multistreaming-Assist.lnk"

  RMDir "$SMPROGRAMS\Multistreaming-Assist"
  RMDir "$INSTDIR\swiftshader"
  RMDir "$INSTDIR\resources"
  RMDir "$INSTDIR\nginx\conf"
  RMDir "$INSTDIR\nginx"
  RMDir "$INSTDIR\locales"
  RMDir "$INSTDIR"

  DeleteRegKey ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"
  SetAutoClose true
SectionEnd