from manim import *
BG="#0B0F19"; ORANGE="#F97316"; GREEN="#10B981"; RED="#EF4444"; CARD="#111827"; WHITE="#F9FAFB"
class Scene2Flow(Scene):
    def construct(self):
        self.camera.background_color=BG
        title=Text("CUSTOMERS COMPARE PRICES",font_size=29,color=ORANGE,weight=BOLD).to_edge(UP,buff=.7)
        quote=RoundedRectangle(corner_radius=.18,width=7.35,height=2.25,color=RED,fill_color=CARD,fill_opacity=1,stroke_width=3)
        qtxt=Text("“Bhaiya, doosre wale ne toh ₹200 kam bola hai!”",font_size=24,color=WHITE,weight=BOLD).scale_to_fit_width(6.8)
        price=Arrow(LEFT*.8,RIGHT*.8,color=RED,stroke_width=6).rotate(-PI/4).next_to(qtxt,DOWN,buff=.12)
        quote_group=VGroup(quote,qtxt,price)
        self.play(Write(title),FadeIn(quote_group,shift=UP),run_time=1.2)
        self.wait(1.0)
        self.play(FadeOut(quote_group),FadeOut(title),run_time=.5)
        house=VGroup(Polygon(LEFT*.85+DOWN*.35,UP*.7,RIGHT*.85+DOWN*.35,color=ORANGE,fill_opacity=.12),Square(side_length=1.2,color=ORANGE).shift(DOWN*.65),Text("AC",font_size=20,color=WHITE).shift(DOWN*.6))
        phone=RoundedRectangle(width=1.65,height=2.8,corner_radius=.2,color=WHITE,fill_color=CARD,fill_opacity=1)
        screen=RoundedRectangle(width=1.38,height=2.05,corner_radius=.1,color=ORANGE,fill_color=BG,fill_opacity=1).move_to(phone)
        feed=VGroup(*[RoundedRectangle(width=1.1,height=.42,corner_radius=.06,color="#1F2937",fill_color="#1F2937",fill_opacity=1) for _ in range(3)]).arrange(DOWN,buff=.08).move_to(screen)
        call=RoundedRectangle(width=1.15,height=.38,corner_radius=.1,color=GREEN,fill_color=GREEN,fill_opacity=1).next_to(screen,DOWN,buff=.1)
        calltxt=Text("CALL NOW",font_size=14,color=BG,weight=BOLD).move_to(call)
        arrow=Arrow(RIGHT*1.2,RIGHT*2.1,color=GREEN,stroke_width=6)
        group=VGroup(house,arrow,phone,screen,feed,call,calltxt).arrange(RIGHT,buff=.35).scale(.95).move_to(UP*.45)
        labels=Text("LOCAL REPAIR NEED  →  SOCIAL FEED  →  DIRECT CALL",font_size=19,color=WHITE,weight=BOLD).scale_to_fit_width(7.25).move_to(DOWN*3.35)
        ring=Circle(radius=.38,color=GREEN,stroke_width=4).move_to(call.get_center()).set_opacity(.65)
        self.play(FadeIn(group,shift=UP),Write(labels),run_time=2.0)
        self.play(ShowPassingFlash(ring.copy().scale(1.5),time_width=.6),Indicate(call,color=GREEN,scale_factor=1.1),run_time=.7)
        self.wait(5.9)
