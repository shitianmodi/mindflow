import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import Layout from "../components/Layout";

const ConsentPage = () => {
  const [accepted, setAccepted] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollAreaRef = useRef(null);

  const { setConsent } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentScrollArea = scrollAreaRef.current;
    if (!currentScrollArea) return;

    const handleScroll = (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setScrolledToBottom(true);
      } else {
        setScrolledToBottom(false);
      }
    };

    const viewport = currentScrollArea.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleContinue = () => {
    if (!accepted) {
      toast({
        variant: "destructive",
        title: "需要同意",
        description: "请先阅读并同意咨询协议书",
      });
      return;
    }
    
    setConsent(true);
    toast({
      title: "已确认同意",
      description: "您已同意咨询协议书",
    });
    navigate("/sand-tray");
  };

  return (
    <Layout title="咨询协议书" currentStep={1} showNavigation={true}>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <ScrollArea className="h-[400px] rounded-md border p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">沙盘治疗分析系统 - 咨询协议书</h3>
            
            <p>亲爱的同学/来访者：</p>
            
            <p>为了保护您的权益、提高咨询质量，请您仔细阅读下列事项，并签名确认您已知悉、认可和接纳本确认书所列的各项描述。未成年人或者其他由家属陪同的来访者，请家属代为签署；两人以上一同前来的成年来访者，请同时签署，谢谢您。</p>
            
            <h4 className="font-bold mt-4"> 关于心理沙盘</h4>
            <p>心理沙盘（又称沙盘游戏或沙盘疗法）是一种广泛应用于心理咨询、教育、临床治疗等领域的工具，通过沙具和沙盘的创造性摆放，帮助个体表达内心世界、促进自我觉察和疗愈。</p>
            
            <h4 className="font-bold mt-4">关于心理咨询师的职责和来访者的权利说明：</h4>
            <h4 className="font-bold mt-4">咨询过程中，咨询师的权利和义务：</h4>
            <h5 className="font-bold mt-2">A. 责任：</h5>
            <p>（1）严格遵守国家有关法律法规；</p>
            <p>（2）与求助者建立平等友好的咨询关系；</p>
            <p>（3）严格遵守保密等咨询行业伦理原则；</p>
            <p>（4）向求助者介绍自己的受训背景；</p>
            <p>（5）承诺为签署本咨询确认书求助者提供心理咨询和顾问服务。</p>
            <h5 className="font-bold mt-2">B. 权利：</h5>
            <p>（1）有权了解与求助者心理问题有关的个人资料；</p>
            <p>（2）有权选择合适的求助者；</p>
            <p>（3）基于对求助者负责的态度或咨询师对自身咨询工作能力有限性的评估，有权提出转介或中止咨询。</p>
            <h5 className="font-bold mt-2">C. 义务：</h5>
            <p>（1）心理咨询师不得因求助者的性别、年龄、职业、民族、国籍、宗教信仰、价值观等任何方面的因素歧视求助者；</p>
            <p>（2）心理咨询师在咨询关系建立之前，必须让求助者了解心理咨询工作的性质、特点、这一工作可能的局限以及求助者自身的权利和义务；</p>
            <p>（3）心理咨询师在对求助者进行工作时，应与求助者对工作的重点进行讨论并达成一致意见，必要时（如采用某些咨询方法）应与求助者达成书面协议；</p>
            <p>（4）心理咨询师与求助者之间不得产生和建立咨询以外的任何关系。尽量避免双重关系（尽量不与熟人、亲友、同事建立咨询关系），更不得利用求助者对咨询师的信任谋取私利，尤其不得对异性有非礼的言行；</p>
            <p>（5）心理咨询师必须保证胜任能力，定期参加专业学习和接受督导。</p>

            <p>咨询过程中，来访者与咨询师有其相应的责任、权利和义务。</p>
            <h4 className="font-bold mt-4">求助者及其监护人的权利和义务：</h4>
            <h5 className="font-bold mt-2">A. 权利：</h5>
            <p>（1）求助者可以根据个人意愿选择咨询师；</p>
            <p>（2）对咨询进程不满意可要求更换咨询师或转介；</p>
            <p>（3）有权利选择或更换合适的咨询师；</p>
            <p>（4）对咨询方案、咨询收费、咨询时间有知情权和选择权；</p>
            <p>（5）来访者有权利选择的心理咨询服务。</p>
            <h5 className="font-bold mt-2">B. 义务：</h5>
            <p>（1）遵守咨询机构的有关规定；</p>
            <p>（2）遵守和执行商定好的咨询方案、咨询收费、咨询时间等方面的规则；</p>
            <p>（3）求助者应尊重咨询师。</p>

            <h4 className="font-bold mt-4"> 关于保密</h4>
            <p>保密资料：即心理咨询工作中的有关信息，包括个案记录、测验资料、信件、录音、录像和其他资料，均属专业信息，应在严格保密的情况下进行保存。</p>
            <p> 我了解：咨询中所涉及的我的个人隐私及相关资料，都将受到严密保护，不会在任何场合公开。</p>
            <p> **保密例外**</p>
            <p>1）经过我的书面同意</p>
            <p>2）法律规定的例外情况</p>
            <p>在下列情况中，您的咨询师可以不经过您的同意或授权，使用或披露您的个人信息。</p>
            <p>①虐待儿童、老人和残疾人员：如果您的咨询师有合理理由相信，有儿童、残疾人员、老人正被虐待、忽视或压迫，或者是处于一个受虐待、忽视或压迫后的状况中，她/他必须依照法律规定，立即向有关部门报告相关信息。</p>
            <p>②司法或行政程序: 我们将在法律范围内最大限度保护您的信息。不过，如果是法庭命令我们披露信息，我们不得不提供。如果您被卷入或在考虑一场诉讼，您应该咨询您的律师以确定法院是否命令我们披露信息。另外，根据我国法律规定，咨询师的保密性不得与现行国家法律法规冲突。</p>
            <p>③严重威胁到健康或安全：如果您的咨询师认为您将对自己或他人构成明显和实质性的严重伤害的危机/风险，她/他可以把您的相关机密资料透露给公共机关、潜在的受害者、其他专业人员或您的家人，以防范/阻止此类伤害的发生。 </p>
            <p>④如果您向您的咨询师传达您即将对一个或多个明确的受害人实施严重的身体伤害或死亡的行为，同时您的咨询师也确信您的意图和能力足以实施此类威胁，那么她/他必须依法作出行动，以防范/阻止此类伤害的发生。 </p>
            <p>3）对个人隐私作严格技术处理后，不涉及具体人物的心理教学、研讨及撰写。</p>
            <p>在大多数情况下，您的咨询师需要与助理和其它咨询师就来访者的情况互相征询和督导。</p>
            <p>如果您不希望其他咨询师来协商关于您的案例，请让您的咨询师知道。</p>
            <p>我们所有的专业工作人员都必须遵守同样的保密规则。所有的咨询助理也都经过隐私保密规则的培训，并且承诺未经专业工作人员的批准不会透露任何消息给咨询以外的人。</p>
            <p>有时，我们会在研讨会、课堂或者科学著作中引用经过修饰的案例材料。这时，所有能识别出个人的信息和受保护的信息都将被删除。</p>

            <p>危机状况：来访者承诺整个咨询期间（包括咨询的间隔）不会实施自杀行为。若来访者违背承诺，不幸选择自杀，责任及行为后果将由来访者承担。</p>

            <p className="mt-6">我已知晓并同意在进行心理沙盘治疗的过程中开放摄像头和录音。</p>
          </div>
        </ScrollArea>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={accepted} 
              onCheckedChange={(checked) => setAccepted(!!checked)} 
              disabled={!scrolledToBottom}
            />
            <label
              htmlFor="terms"
              className={`text-sm font-medium leading-none ${!scrolledToBottom ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              我已阅读并同意以上条款
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              取消
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!accepted || !scrolledToBottom}
              className={(!accepted || !scrolledToBottom) ? "opacity-50 cursor-not-allowed" : ""}
            >
              继续
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConsentPage;
