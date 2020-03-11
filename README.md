# Multistreaming-Assist

* Electron 6.13.7
* Nginx-RTMP-Win32 (https://github.com/illuspas/nginx-rtmp-win32)



## 배포시 유의사항

프로그램에 멀웨어를 심어 배포하는 행위를 막기위해, 프로그램의 exe 파일 및 zip 파일만 단독으로 배포하는 행위를 금지합니다. (반드시 Github 링크를 통한 공유만 해주시기 바랍니다.)



## 사용법

> ### nginx.conf 파일 생성하기
> ![1](https://user-images.githubusercontent.com/38521736/76392598-3c4b0000-63b5-11ea-90a6-69ba3752cd82.png)
> 1. twitch/youtube/기타 RTMP 주소 및 키 값을 채움 (필요한 것만 채우면 됩니다.)
> 2. 좌측 하단의 'nginx.conf 생성' 버튼 클릭
> * nginx.conf 파일은 한번 생성하면 다시 'nginx.conf 생성' 버튼을 클릭하기 전까지 유지됩니다
   
***
   
> ### nginx.exe 실행하기/정지하기
> ![1](https://user-images.githubusercontent.com/38521736/76392609-410fb400-63b5-11ea-9a9d-151993476a81.png)
> 1. nginx.conf 파일이 생성된걸 확인 후, 우측 하단 푸른색의 'nginx 실행' 버튼을 클릭하면 아래 사진과 같이 붉은색의 'nginx 정지' 버튼으로 변경되고 nginx.exe가 실행됨(작업 관리자 확인 요망)
> 
> ![2](https://user-images.githubusercontent.com/38521736/76392612-41a84a80-63b5-11ea-98d4-4dfbff9e1dec.png)
   
***
   
> ### 프로그램 종료시 주의사항
> ![1](https://user-images.githubusercontent.com/38521736/76392622-45d46800-63b5-11ea-9ef1-17d397143882.png)
> 1. 프로그램을 종료하기전에 nginx.exe가 실행되고 있는 상태라면, 반드시 우측 하단의 붉은색의 'nginx 정지' 버튼을 누른 뒤
> 2. 우측 상단의 닫기버튼을 클릭해 닫을 것을 권장함
