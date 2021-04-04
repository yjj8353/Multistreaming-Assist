# Multistreaming-Assist

## 이 프로젝트를 후원해 주세요!

이 개발자가 커피맛을 알까요?  
<a href="https://donaricano.com/mypage/1527417837_Fi5MCg" target="_blank"><img src="https://d1u4yishnma8v5.cloudfront.net/donarincano_gift.png" alt="donaricano-btn" style="height: 70px !important;width: 200px !important;" /></a>


## 배포시 유의사항

프로그램에 멀웨어를 심어 배포하는 행위를 막기위해, 프로그램의 exe 파일 및 zip 파일만 단독으로 배포하는 행위를 금지합니다. (반드시 Github 링크를 통한 공유만 해주시기 바랍니다.)



## 사용법

> ### 방송 송츨 세팅  
> ![스트리밍](https://user-images.githubusercontent.com/38521736/113496929-975c1180-9539-11eb-808b-a41b9ae3708d.png)  
> 1. 상단 입력칸에 본인이 송출을 원하는 RTMP Key 값을 입력하고, 우측 토글 스위치를 활성화해서 킵니다  
> 2. 'NGINX 실행' 버튼을 클릭해 nginx.exe를 실행합니다
> 
> ![스트리밍2](https://user-images.githubusercontent.com/38521736/113496931-9dea8900-9539-11eb-8e7a-1335a4a71cb0.png)  
> 1. nginx.exe가 실행되면 우측 하단의 버튼이 붉은색으로 변하면서 'NGINX 정지' 버튼으로 변경됩니다  
   
***

> ### 녹화 세팅
> ![녹화](https://user-images.githubusercontent.com/38521736/113497937-494c0b80-9543-11eb-9387-93cb0a2a7518.png)
> 1. '경로 설정' 버튼을 클릭하고, 녹화 파일을 저장할 경로를 설정해 줍니다, 직접 입력해도 상관 없으나 경로 설정을 이용한 설정을 권장합니다
> 2. 우측 토글 버튼을 활성화 해서 녹화를 킵니다

***
   
> ### OBS 연동
> ![OBS](https://user-images.githubusercontent.com/38521736/76396069-e2016d80-63bb-11ea-91c0-1fede7df5b0c.png)
> 1. 서버 칸에 'rtmp://localhost/live' 라고 적은 후
> 2. 적용 버튼 클릭
> 3. 확인 버튼 클릭
   
***
   
> ### 방송 시작
> ![OBS2](https://user-images.githubusercontent.com/38521736/76395806-6f908d80-63bb-11ea-9e29-4ab51dc02191.png)
> 1. nginx.exe 실행 상태에서 우측 하단의 '방송 시작' 버튼 클릭 
> * 이때, 방송 시작이 정상적으로 진행되지 않는다면 nginx.exe가 제대로 실행되지 않았을 가능성이 높습니다, 이에 대한 자세한 정보를 알고 싶으시다면 Q&A 항목을 확인해 주세요
   
## Q&A

> ### Q. nginx.exe가 실행되지 않는 경우는 어떤 경우가 있나요?  
> A. 현재까지 확인된 nginx가 제대로 실행되지 않는 경우는 크게 다음과 같습니다  
> (1) 유효하지 않은 twitch/youtbe 키 값 및 추가적인 rtmp 서버/키 값이 입력된 경우  
> (2) Windows Defender 외의 서드파티 백신을 사용 할 경우
> 
> ### Q. nginx.exe가 실행중인지 확인하는 방법이 있나요?  
> A. '도구' > 'NGINX 프로세스 확인' 탭을 클릭하면 됩니다  
> ![확인1](https://user-images.githubusercontent.com/38521736/113497803-3b49bb00-9542-11eb-894a-15d47f5536e3.png)  
> ![확인2](https://user-images.githubusercontent.com/38521736/113497806-3f75d880-9542-11eb-856b-bd39714937fb.png)
> 
> ### Q. 녹화 기능은 뭔가요?
> A. nginx RTMP 모듈의 포함된 기능인 record를 사용한 기능입니다, 해당 기능은 nginx.exe를 통한 스트리밍 영상을 자동으로 자신의 컴퓨터에 기록해 줍니다
> 
> ### Q. 아프리카TV 플랫폼에서 송출이 되지 않습니다
> A. 아프리카TV는 nginx.exe를 통한 스트리밍을 막고 있습니다
